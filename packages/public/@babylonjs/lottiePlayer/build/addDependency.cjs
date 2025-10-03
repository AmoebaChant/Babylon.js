const fs = require("fs");
const path = require("path");

const pkgPath = path.resolve(__dirname, "../package.json");
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

packageObject.dependencies["@babylonjs/core-for-lottie-player"] = "file:dependencies/core-for-lottie-player"
";

try {
    fs.writeFileSync(pkgPath, JSON.stringify(packageObject, null, 2) + "\n", "utf8");
} catch (err) {
    console.error("ERROR: Failed to write updated package.json:", err.message);
    process.exit(1);
}
