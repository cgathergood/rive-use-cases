# Rive: Google Ads App Campaign Integration

This folder contains examples and resources for integrating Rive graphics into Google Ads app campaigns.

## Examples

### Parcel Bundler Example

**Location**: `examples/rive-google-ads-parcel/`

A complete example demonstrating how to use [Parcel](https://parceljs.org/) to bundle Rive into a Google Ads-compatible format.

**Features:**

- Runtime: Using the \*single variant of Rive's web runtime which bundles the Rive WASM library into a single JS package
- Proper ad sizing (320x480) with responsive layout
- Random graphic selection between multiple Rive files
- Optimized bundle size for ad delivery
- Google Ads meta tags and structure

**Key Components:**

- `src/index.html` - Ad container with proper meta tags
- `src/index.ts` - Rive logic and setup
- `assets/` - Sample Rive files
- `dist/` - Built ad files ready for Google Ads

**Quick Start:**

```bash
cd examples/rive-google-ads-parcel
npm install
npm run build
```

The built files in `dist/` can be zipped up and uploaded to Google.

**Testing Locally:**

```bash
cd examples/rive-google-ads-parcel
npm install
npm run start
```

#### Important Notes

⚠️ **Clean Build Required**: Before each build, manually delete the `dist/` folder to ensure a clean build. This prevents stale files from previous builds being included in your final bundle.

⚠️ **No Source Maps**: To reduce the size of the `dist` folder we pass `--no-source-maps` to the build process.

⚠️ **Root relative assets**: Assets (`.js/.ts` and `.riv` files) need to be root relative to be discoverable. We pass `--public-url ./` to the build process to ensure this.

## Resources

- [Rive Documentation](https://rive.app/docs/runtimes/getting-started) - Complete runtime guides
- [Rive Best Practices](https://rive.app/docs/getting-started/best-practices) - Best practices to optimize Rive graphics
- [Rive Use Cases](https://rive.app/use-cases) - More examples and inspiration
- [Rive Community](https://community.rive.app/) - Get help and share projects

## Contributing

Found an issue or have a suggestion? Please [open an issue](https://github.com/rive-app/rive-use-cases/issues) or submit a pull request to help improve these examples.

---

For more Rive examples and use cases, visit the [main repository](https://github.com/rive-app/rive-use-cases/).
