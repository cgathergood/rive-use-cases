# Rive Google App Ads Template

A lightweight template for building interactive [Rive](https://rive.app) animations into a **Google App Campaign ad**.

## Performance and Feature Limitations

Google App Ads are displayed inside a WebView in Android or iOS apps. WebViews aren't as powerful as modern browsers, and Google may limit permissions that are normally available elsewhere.

To ensure compatibility:

1. Follow Rive's [best practices guidelines](https://rive.app/docs/getting-started/best-practices)
2. Avoid blend modes
3. Avoid clipping masks that clip the artboard
4. Test your ad on a real device
5. Keep your total ad size (including .wasm, .js, .riv, and .html) under 1 MB

## Getting Started

Clone the repo and install dependencies:

```sh
git clone git@github.com:rive-app/rive-use-cases.git
cd rive-use-cases/rive-google-ads/examples/rive-google-ads-parcel
npm install
```

## Preview your Ad in a Desktop Browser

```sh
npm run start
```

Then open http://localhost:1234/

## Preview your Ad in a Mobile Browser

Make sure your mobile device is on the same Wi-Fi network as your computer.

Find your local IP address:

```sh
ifconfig | grep 'inet ' | grep -v 127.0.0.1
```

Look for an address like 192.168.x.x or 10.x.x.x.

Then run:

```sh
npm run start
```

And open this URL in your mobile browser (replace with your IP):: http://192.168.x.x:1234

## Compile your Ad:

```sh
npm run build
```

Zip the following files from the dist folder:

- .html
- .js
- .riv
- .wasm

This .zip is what you will upload to Google as your HTML5 ad.

## Create a Google App Ad

1. Follow Google's instructions for creating an App Ad Campaign
2. Upload your .zip as an HTML5 ad unit
