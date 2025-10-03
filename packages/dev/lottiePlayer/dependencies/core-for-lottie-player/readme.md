This internal package builds a simplified version of @babylonjs/core that includes only what the @babylonjs/lottie-player package needs.

The @babylonjs/lottie-player package then distributes a .tgz of this package in a vendor subfolder and references @babylonjs/core-for-lottie-player instead of @babylonjs/core
