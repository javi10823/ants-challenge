# ants-race-challenge

ants-race-challenge app

## Prerequisites to build

- Android Studio ([Download](https://developer.android.com/studio))
  - This is optional, but can be very useful in debugging applications and managing configurations.
- Cocoapods
  - macOS: `brew install cocoapods`
- Flipper ([Installation](https://fbflipper.com/docs/getting-started/index#installation) instructions)
  - macOS: `brew install --cask flipper`
- Node v14.15.0
- Xcode ([Download](https://developer.apple.com/xcode/) or use the [macOS App Store](https://apps.apple.com/us/app/xcode/id497799835?mt=12))

## Dependency Installation

```bash
yarn
```

### Linking in iOS

```bash
cd ios && pod install
```

## Running the App

See [Running On Device](https://reactnative.dev/docs/running-on-device)

### Run Project in iOS

To build and open the simulator without opening Xcode.

```bash
yarn ios
```

A custom simulator can be provided as a command line argument as well; see [Running on Simulator](https://reactnative.dev/docs/running-on-simulator-ios).

### Run Project in Android

To build and open the simulator without opening Android Studio.

```bash
yarn android
```

### Usage of the app

The first screen you see will be a blank screen.
If the button "Get ants" is pressed, it will fetch and load a list of ants, with some details of each one.
You can expand the items of the list to see more details.

If the button "Simulate race" is pressed, it will start to calculate thelikelihood of winning of the ants.
once calculated, it will appear as a detail below the name of each ant, and these will be ordered from highest to lowest.

Finally the button "Reset" is pressed, all the data will be reset and the same options will be given again.
