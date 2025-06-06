/* eslint-disable @typescript-eslint/naming-convention */
/**
 * Enum for Device Types
 */
export enum DeviceType {
    /** Generic */
    Generic = 0,
    /** Keyboard */
    Keyboard = 1,
    /** Mouse */
    Mouse = 2,
    /** Touch Pointers */
    Touch = 3,
    /** PS4 Dual Shock */
    DualShock = 4,
    /** Xbox */
    Xbox = 5,
    /** Switch Controller */
    Switch = 6,
    /** PS5 DualSense */
    DualSense = 7,
}

// Device Enums
/**
 * Enum for All Pointers (Touch/Mouse)
 */
export enum PointerInput {
    /** Horizontal Axis (Not used in events/observables; only in polling) */
    Horizontal = 0,
    /** Vertical Axis (Not used in events/observables; only in polling) */
    Vertical = 1,
    /** Left Click or Touch */
    LeftClick = 2,
    /** Middle Click */
    MiddleClick = 3,
    /** Right Click */
    RightClick = 4,
    /** Browser Back */
    BrowserBack = 5,
    /** Browser Forward */
    BrowserForward = 6,
    /** Mouse Wheel X */
    MouseWheelX = 7,
    /** Mouse Wheel Y */
    MouseWheelY = 8,
    /** Mouse Wheel Z */
    MouseWheelZ = 9,
    /** Used in events/observables to identify if x/y changes occurred */
    Move = 12,
}

/** @internal */
export const enum NativePointerInput {
    /** Horizontal Axis */
    Horizontal = PointerInput.Horizontal,
    /** Vertical Axis */
    Vertical = 1,
    /** Left Click or Touch */
    LeftClick = 2,
    /** Middle Click */
    MiddleClick = 3,
    /** Right Click */
    RightClick = 4,
    /** Browser Back */
    BrowserBack = 5,
    /** Browser Forward */
    BrowserForward = 6,
    /** Mouse Wheel X */
    MouseWheelX = 7,
    /** Mouse Wheel Y */
    MouseWheelY = 8,
    /** Mouse Wheel Z */
    MouseWheelZ = 9,
    /** Delta X */
    DeltaHorizontal = 10,
    /** Delta Y */
    DeltaVertical = 11,
}

/**
 * Enum for Dual Shock Gamepad
 */
export const enum DualShockInput {
    /** Cross */
    Cross = 0,
    /** Circle */
    Circle = 1,
    /** Square */
    Square = 2,
    /** Triangle */
    Triangle = 3,
    /** L1 */
    L1 = 4,
    /** R1 */
    R1 = 5,
    /** L2 */
    L2 = 6,
    /** R2 */
    R2 = 7,
    /** Share */
    Share = 8,
    /** Options */
    Options = 9,
    /** L3 */
    L3 = 10,
    /** R3 */
    R3 = 11,
    /** DPadUp */
    DPadUp = 12,
    /** DPadDown */
    DPadDown = 13,
    /** DPadLeft */
    DPadLeft = 14,
    /** DRight */
    DPadRight = 15,
    /** Home */
    Home = 16,
    /** TouchPad */
    TouchPad = 17,
    /** LStickXAxis */
    LStickXAxis = 18,
    /** LStickYAxis */
    LStickYAxis = 19,
    /** RStickXAxis */
    RStickXAxis = 20,
    /** RStickYAxis */
    RStickYAxis = 21,
}

/**
 * Enum for Dual Sense Gamepad
 */
export const enum DualSenseInput {
    /** Cross */
    Cross = 0,
    /** Circle */
    Circle = 1,
    /** Square */
    Square = 2,
    /** Triangle */
    Triangle = 3,
    /** L1 */
    L1 = 4,
    /** R1 */
    R1 = 5,
    /** L2 */
    L2 = 6,
    /** R2 */
    R2 = 7,
    /** Create */
    Create = 8,
    /** Options */
    Options = 9,
    /** L3 */
    L3 = 10,
    /** R3 */
    R3 = 11,
    /** DPadUp */
    DPadUp = 12,
    /** DPadDown */
    DPadDown = 13,
    /** DPadLeft */
    DPadLeft = 14,
    /** DRight */
    DPadRight = 15,
    /** Home */
    Home = 16,
    /** TouchPad */
    TouchPad = 17,
    /** LStickXAxis */
    LStickXAxis = 18,
    /** LStickYAxis */
    LStickYAxis = 19,
    /** RStickXAxis */
    RStickXAxis = 20,
    /** RStickYAxis */
    RStickYAxis = 21,
}

/**
 * Enum for Xbox Gamepad
 */
export const enum XboxInput {
    /** A */
    A = 0,
    /** B */
    B = 1,
    /** X */
    X = 2,
    /** Y */
    Y = 3,
    /** LB */
    LB = 4,
    /** RB */
    RB = 5,
    /** LT */
    LT = 6,
    /** RT */
    RT = 7,
    /** Back */
    Back = 8,
    /** Start */
    Start = 9,
    /** LS */
    LS = 10,
    /** RS */
    RS = 11,
    /** DPadUp */
    DPadUp = 12,
    /** DPadDown */
    DPadDown = 13,
    /** DPadLeft */
    DPadLeft = 14,
    /** DRight */
    DPadRight = 15,
    /** Home */
    Home = 16,
    /** LStickXAxis */
    LStickXAxis = 17,
    /** LStickYAxis */
    LStickYAxis = 18,
    /** RStickXAxis */
    RStickXAxis = 19,
    /** RStickYAxis */
    RStickYAxis = 20,
}

/**
 * Enum for Switch (Pro/JoyCon L+R) Gamepad
 */
export const enum SwitchInput {
    /** B */
    B = 0,
    /** A */
    A = 1,
    /** Y */
    Y = 2,
    /** X */
    X = 3,
    /** L */
    L = 4,
    /** R */
    R = 5,
    /** ZL */
    ZL = 6,
    /** ZR */
    ZR = 7,
    /** Minus */
    Minus = 8,
    /** Plus */
    Plus = 9,
    /** LS */
    LS = 10,
    /** RS */
    RS = 11,
    /** DPadUp */
    DPadUp = 12,
    /** DPadDown */
    DPadDown = 13,
    /** DPadLeft */
    DPadLeft = 14,
    /** DRight */
    DPadRight = 15,
    /** Home */
    Home = 16,
    /** Capture */
    Capture = 17,
    /** LStickXAxis */
    LStickXAxis = 18,
    /** LStickYAxis */
    LStickYAxis = 19,
    /** RStickXAxis */
    RStickXAxis = 20,
    /** RStickYAxis */
    RStickYAxis = 21,
}
