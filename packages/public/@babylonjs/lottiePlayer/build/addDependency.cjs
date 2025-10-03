const fs = require("fs");
const path = require("path");

/**
 * Reads and parses the package.json file at the given path.
 */
function getPackageJsonObject(pkgPath) {
    let packageText;
    try {
        packageText = fs.readFileSync(pkgPath, "utf8");
    } catch (err) {
        console.error(`ERROR: Could not read package.json at ${pkgPath}:`, err.message);
        process.exit(1);
    }

    let packageObject;
    try {
        packageObject = JSON.parse(packageText);
    } catch (err) {
        console.error("ERROR: package.json is not valid JSON:", err.message);
        process.exit(1);
    }

    if (!packageObject.dependencies || typeof packageObject.dependencies !== "object") {
        packageObject.dependencies = {};
    }
    return packageObject;
}

/**
 * Get the filename of the @babylonjs/core-for-lottie-player .tgz file
 */
function getCoreForLottiePlayerTgz() {
    const directoryToSearch = path.resolve(__dirname, "../");
    const files = fs.readdirSync(directoryToSearch);
    const coreForLottiePlayerTgz = files.find((file) => file.startsWith("babylonjs-lottie-player-") && file.endsWith(".tgz"));
    if (!coreForLottiePlayerTgz) {
        console.error("ERROR: Could not find the @babylonjs/core-for-lottie-player .tgz file in current directory");
        process.exit(1);
    }
    console.log(`Found the @babylonjs/core-for-lottie-player .tgz file: ${coreForLottiePlayerTgz}`);
    return coreForLottiePlayerTgz;
}

/**
 * Save the updated package.json
 */
function savePackageJson(pkgPath, packageObject) {
    try {
        fs.writeFileSync(pkgPath, JSON.stringify(packageObject, null, 4) + "\n", "utf8");
    } catch (err) {
        console.error("ERROR: Failed to write updated package.json:", err.message);
        process.exit(1);
    }
}

const pkgPath = path.resolve(__dirname, "../package.json");
const packageObject = getPackageJsonObject(pkgPath);
const coreForLottiePlayerTgz = getCoreForLottiePlayerTgz();

packageObject.dependencies["@babylonjs/core-for-lottie-player"] = "file:" + coreForLottiePlayerTgz;

savePackageJson(pkgPath, packageObject);
