import type { Nullable } from "@dev/core/types";
import { test, TestInfo } from "@playwright/test";
import { getGlobalConfig } from "@tools/test-tools";

export type AudioNodeType = "AudioBus" | "AudioEngineV2" | "MainAudioBus" | "StaticSound" | "StreamingSound";
export type SoundType = "StaticSound" | "StreamingSound";

export const enum Channel {
    /** Left speaker channel */
    L = 0,
    /** Right speaker channel */
    R = 1,
}

/** The number of decimal places used for volume comparisons using `expect(...).toBeCloseTo(...)`. */
export const VolumePrecision = 1;

/**
 * The maximum pulse volume in the sound test file containing the pulse train.
 */
const MaxPulseVolume = 0.1;

const PulseGapLengthThresholdInMilliseconds = 0.01;
const PulseTrainLengthInSamples = 90;
const PulseVolumeThreshold = 0.05;

export class AudioTestConfig {
    public baseUrl = getGlobalConfig().baseUrl;
    public soundsUrl = getGlobalConfig().assetsUrl + "/sound/testing/audioV2/";

    public formatAc3SoundFile = "ac3.ac3";
    public formatMp3SoundFile = "mp3.mp3";
    public formatOggSoundFile = "ogg.ogg";
    public hashedSoundFile = "pulsed#2.mp3";
    public pulsed1CountSoundFile = "pulsed-1.mp3";
    public pulsed3CountHalfSpeedSoundFile = "pulsed-3-count--1-second-each--0.5-speed.mp3";
    public pulsed3CountSoundFile = "pulsed-3-count--1-second-each.mp3";
    public pulseTrainSoundFile = "square-1-khz-0.1-amp-for-10-seconds.flac";
}

export class AudioTestResult {
    public length: number = 0;
    public numberOfChannels: number = 0;
    public sampleRate: number = 0;
    public samples: Nullable<Float32Array[]> = null;
    public volumeCurves: Nullable<Float32Array[]> = null;
}

// Declarations for babylonServer/public/audiov2-test.js
declare global {
    let audioTestConfig: AudioTestConfig;
    let audioTestResult: AudioTestResult;

    class AudioV2Test {
        public static AfterEachAsync(): Promise<void>;
        public static BeforeEachAsync(): Promise<void>;
        public static CreateAudioEngineAsync(options?: Partial<BABYLON.IWebAudioEngineOptions>): Promise<BABYLON.AudioEngineV2>;
        public static CreateAbstractSoundAsync(
            soundType: SoundType,
            source: string | string[],
            options?: Partial<BABYLON.IStaticSoundOptions | BABYLON.IStreamingSoundOptions>
        ): Promise<BABYLON.AbstractSound>;
        public static CreateAbstractSoundAndOutputNodeAsync(
            audioNodeType: AudioNodeType,
            source: string | string[],
            options?: Partial<BABYLON.IStaticSoundOptions | BABYLON.IStreamingSoundOptions> | Partial<BABYLON.IAudioBusOptions>
        ): Promise<{ sound: BABYLON.AbstractSound; outputNode: { spatial: BABYLON.AbstractSpatialAudio; stereo: BABYLON.AbstractStereoAudio; volume: number } }>;
        public static CreateSoundAsync(source: string | string[] | BABYLON.StaticSoundBuffer, options?: Partial<BABYLON.IStaticSoundOptions>): Promise<BABYLON.StaticSound>;
        public static CreateStreamingSoundAsync(source: string | string[], options?: Partial<BABYLON.IStreamingSoundOptions>): Promise<BABYLON.StreamingSound>;
        public static GetResultAsync(): Promise<AudioTestResult>;
        public static WaitAsync(seconds: number): Promise<void>;
    }
}

export const InitAudioV2Tests = () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(getGlobalConfig().baseUrl + `/empty.html`, {
            timeout: 0,
        });

        await page.waitForFunction(() => {
            return window.BABYLON;
        });

        page.setDefaultTimeout(0);

        await page.evaluate(
            async ({ config }: { config: AudioTestConfig }) => {
                audioTestConfig = config;

                await BABYLON.Tools.LoadScriptAsync(audioTestConfig.baseUrl + "/audiov2-test.js");
                await AudioV2Test.BeforeEachAsync();
            },
            { config: new AudioTestConfig() }
        );

        await page.waitForFunction(() => {
            return AudioV2Test;
        });
    });

    test.afterEach(async ({ page }) => {
        if (test.info().status === "failed") {
            let result: AudioTestResult = (<any>test.info()).audioTestResult;

            if (!result) {
                result = await page.evaluate(async () => {
                    return await AudioV2Test.GetResultAsync();
                });
            }

            SaveAudioTestResult(test.info(), result);
        }

        await page.evaluate(async () => {
            await AudioV2Test.AfterEachAsync();
        });

        // await page.close();
    });
};

/**
 * Gets the pulse counts of the given result's samples.
 *
 * Consecutive pulses are counted as a group, with the number of pulses in the group being the count. The group is
 * ended when a silence of at least `PulseGapLengthThresholdInMilliseconds` is detected or the end of the captured
 * audio is reached.
 *
 * For example, the shape of the returned pulse count arrays for a test result containing 2 channels with 3 groups of
 * pulses detected as 5 pulses in the first group, 6 in the second and 7 in the third group, would look like this:
 * [[5, 6, 7], [5, 6, 7]] ... assuming both test result channels contain the same audio output, which is typical.
 *
 * @param result - the test result containing the samples to calculate the pulse counts from
 * @returns an array containing the pulse counts for each channel in the given result's samples
 */
export function GetPulseCounts(result: AudioTestResult): number[][] {
    if (!result.samples?.length || !result.numberOfChannels) {
        return [];
    }

    const pulseCounts = new Array<number[]>(result.numberOfChannels);

    const PulseGapLengthThresholdInSamples = PulseGapLengthThresholdInMilliseconds * result.sampleRate;

    for (let channel = 0; channel < result.numberOfChannels; channel++) {
        let channelPulseCounts: number[] = [];
        const samples = result.samples[channel];

        let pulseStart = -1;
        let pulseEnd = -1;
        let pulseCount = 0;

        let i = 0;
        for (; i < result.length; i++) {
            if (Math.abs(samples[i]) > PulseVolumeThreshold) {
                if (pulseStart === -1) {
                    pulseStart = i;

                    if (pulseEnd !== -1) {
                        const silenceLengthInSamples = i - pulseEnd;
                        if (silenceLengthInSamples > PulseGapLengthThresholdInSamples) {
                            channelPulseCounts.push(pulseCount);
                            pulseCount = 0;
                        }
                    }
                } else {
                    pulseEnd = i;
                }
            } else if (i - pulseStart > PulseTrainLengthInSamples) {
                if (pulseStart !== -1) {
                    pulseCount++;
                    pulseStart = -1;
                }
            }
        }

        if (pulseEnd !== -1) {
            const silenceLengthInSamples = i - pulseEnd;
            if (silenceLengthInSamples > PulseGapLengthThresholdInSamples) {
                channelPulseCounts.push(pulseCount);
            }
        }

        pulseCounts[channel] = channelPulseCounts;
    }

    return pulseCounts;
}

/**
 * Gets the volumes of the given result's samples.
 *
 * The volume of each pulse is calculated by taking the absolute value of the samples and averaging them over the pulse length.
 *
 * The average volume is stored in the `volumeCurves` array for each channel, and is repeated for each sample in the pulse making
 * the resulting `volumeCurves` array length the same as the result's `samples` array, which makes it easier to find the
 * resulting volume at a given time.
 *
 * @param result - the test result containing the samples to calculate the volume from
 * @returns an array containing the volume of each pulse aligned with channels and samples in the given result's samples
 */
function GetVolumeCurves(result: AudioTestResult): Float32Array[] {
    if (!result.samples?.length) {
        return [];
    }

    if (result.volumeCurves) {
        return result.volumeCurves;
    }

    result.volumeCurves = new Array<Float32Array>(result.samples.length);

    for (let channel = 0; channel < result.numberOfChannels; channel++) {
        const samples = result.samples[channel];

        let curve = new Float32Array(result.length);

        let currentPolarity = samples[0] > 0;
        let pulseStartIndex = 0;

        const updateCurve = (pulseEndIndex: number) => {
            const pulseLength = pulseEndIndex - pulseStartIndex;
            if (pulseLength > 2) {
                // Don't include the first and last samples in the average volume calculation. They are typically
                // values transitioning across the zero line when the polarity changes, and are not representative of
                // the actual pulse volume.
                let totalVolume = 0;
                for (let j = pulseStartIndex + 1; j < pulseEndIndex - 1; j++) {
                    totalVolume += Math.abs(samples[j]);
                }
                const avgVolume = totalVolume / (pulseLength - 2);

                for (let j = pulseStartIndex; j < pulseEndIndex; j++) {
                    curve[j] = avgVolume;
                }
            }
        };

        let i = 0;
        for (; i < result.length; i++) {
            if (currentPolarity !== samples[i] > 0) {
                updateCurve(i);
                pulseStartIndex = i;
                currentPolarity = !currentPolarity;
            }
        }
        updateCurve(i);

        result.volumeCurves[channel] = curve;

        // Save the audio test result to the test info so it can be retrieved in `test.afterEach` and attached to the
        // report if needed.
        (<any>test.info()).audioTestResult = result;
    }

    return result.volumeCurves;
}

/**
 * Gets the volumes of the given result's samples at a given time.
 *
 * @param result - the test result containing the samples to calculate the volume from
 * @param time - the time in seconds to get the volumes at
 * @returns an array containing the volume of each channel at the given time
 */
export function GetVolumesAtTime(result: AudioTestResult, time: number): number[] {
    const volumes = new Array<number>(result.numberOfChannels);

    const sampleIndex = Math.floor(time * result.sampleRate);
    const volumeCurves = GetVolumeCurves(result);

    for (let channel = 0; channel < result.numberOfChannels; channel++) {
        const curve = volumeCurves[channel];
        if (curve && sampleIndex < curve.length) {
            volumes[channel] = curve[sampleIndex] / MaxPulseVolume;
        } else {
            volumes[channel] = 0;
        }
    }

    return volumes;
}

/**
 * Creates WAVE file data from the given samples.
 */
class WaveFileData {
    private _data: DataView;
    private _dataLength: number = 0;
    private _pos: number = 0;

    public readonly data: ArrayBuffer;

    public constructor(samples: Float32Array[], length: number, numberOfChannels: number, sampleRate: number) {
        const BytesPerSample = 2;
        const WavHeaderSize = 44;

        this._dataLength = WavHeaderSize + length * numberOfChannels * BytesPerSample;
        this.data = new ArrayBuffer(this._dataLength);
        this._data = new DataView(this.data);

        // Write WAVE header.
        this._setUint32(0x46464952); // "RIFF"
        this._setUint32(this._dataLength - 8); // Data length - 8 bytes for "RIFF" and "WAVE"
        this._setUint32(0x45564157); // "WAVE"

        // Write "fmt " chunk.
        this._setUint32(0x20746d66); // "fmt "
        this._setUint32(16); // Length = 16
        this._setUint16(1); // PCM (uncompressed)
        this._setUint16(numberOfChannels);
        this._setUint32(sampleRate);
        this._setUint32(sampleRate * numberOfChannels * BytesPerSample); // Average bytes per second
        this._setUint16(numberOfChannels * BytesPerSample); // Block-align
        this._setUint16(8 * BytesPerSample); // Bit-depth

        // Write "data" chunk.
        this._setUint32(0x61746164); // "data"
        this._setUint32(this._dataLength - this._pos - 4); // Chunk length

        // Write interleaved data.
        const interleavedSamples = new Float32Array(length * numberOfChannels);
        for (let i = 0; i < length; i++) {
            for (let channel = 0; channel < numberOfChannels; channel++) {
                interleavedSamples[i * numberOfChannels + channel] = samples[channel][i];
            }
        }
        for (let i = 0; i < interleavedSamples.length; i++) {
            const sample = Math.max(-1, Math.min(1, interleavedSamples[i])); // Clamp
            const intSample = (0.5 + sample < 0 ? sample * 32768 : sample * 32767) | 0; // Scale to 16-bit signed int
            this._setInt16(intSample); // Write 16-bit sample
        }
    }

    private _setInt16(value: number): void {
        this._data.setInt16(this._pos, value, true);
        this._pos += 2;
    }

    private _setUint16(value: number): void {
        this._data.setUint16(this._pos, value, true);
        this._pos += 2;
    }

    private _setUint32(value: number): void {
        this._data.setUint32(this._pos, value, true);
        this._pos += 4;
    }
}

/**
 * Saves the audio test result as .wav files and attaches them to the given test info so they are added to the report.
 *
 * @param testInfo - the test info to attach the files to
 * @param result - the audio test result to save
 */
export function SaveAudioTestResult(testInfo: TestInfo, result: AudioTestResult): void {
    if (result.length > 0 && result.numberOfChannels > 0) {
        if (result.samples) {
            const waveFileData = new WaveFileData(result.samples, result.length, result.numberOfChannels, result.sampleRate);
            testInfo.attach("audio-samples.wav", {
                body: Buffer.from(waveFileData.data),
                contentType: "audio/wav",
            });
        }

        if (result.volumeCurves) {
            const waveFileData = new WaveFileData(result.volumeCurves, result.length, result.numberOfChannels, result.sampleRate);
            testInfo.attach("audio-volume-curves.wav", {
                body: Buffer.from(waveFileData.data),
                contentType: "audio/wav",
            });
        }
    }
}
