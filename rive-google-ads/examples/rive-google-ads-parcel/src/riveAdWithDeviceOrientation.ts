// IMPORTANT: Device Orientation is NOT supported for iOS ads!
// It may work on certain Android devices, but it is not guaranteed so include fallback functionality.

import { Rive, Fit, Layout, RuntimeLoader } from '@rive-app/webgl2'
import { isDeviceOrientationSupported } from './utils/isDeviceOrientationSupported'

// Add your .riv file to the assets folder and update the name below
const AdFile = new URL('/assets/bike_op.riv', import.meta.url)
// This is the name of the state machine in the Rive file that we want to control
const stateMachineName = 'State Machine 1'
// This is how the Rive artboard should fit in the canvas (Fit.Layout is recommended for ads)
const fitType = Fit.Layout
// If you're using Fit.Layout, you can set a scale factor to adjust the size of the Rive artboard in the canvas
const layoutScaleFactor = 2

// Google Ads doesn't allow external resources, so we need to use the Rive WASM file bundled with the package
const riveWASMResource = `${new URL('/assets/rive.wasm', import.meta.url)}`
RuntimeLoader.setWasmUrl(riveWASMResource)

// HTML Canvas element to render to
const riveCanvas = document.getElementById('riveCanvas') as HTMLCanvasElement

// Resize on widow
function resizeRiveCanvas(riveInstance: Rive) {
  riveInstance.resizeDrawingSurfaceToCanvas()

  window.addEventListener(
    'resize',
    () => {
      riveInstance.resizeDrawingSurfaceToCanvas()
    },
    false
  )
}

async function setup() {
  // Load the Rive file as an ArrayBuffer
  const bytes = await (await fetch(new Request(AdFile))).arrayBuffer()

  // Check if device orientation is supported (Android only)
  const deviceOrientationSupported = await isDeviceOrientationSupported()

  const riveInstance = new Rive({
    buffer: bytes,
    autoplay: true,
    autoBind: true,
    canvas: riveCanvas,
    layout: new Layout({
      fit: fitType,
      layoutScaleFactor: layoutScaleFactor,
    }),
    stateMachines: [stateMachineName],
    onLoad: () => {
      // Prevent a blurry canvas by using the device pixel ratio
      resizeRiveCanvas(riveInstance)

      // Get the ViewModel instance from the Rive instance
      const vmi = riveInstance.viewModelInstance
      // Get the nested ViewModel called 'property of Bike'
      const bikeVmi = vmi?.viewModel('property of Bike')
      // Get the rotation property from the Bike ViewModel
      // This will be used to control the rotation of the bike based on device orientation
      const rotation = bikeVmi?.number('Rotation')
      // Set the hoverEnabled property to false if using gyroscope
      const hoverEnabled = bikeVmi?.boolean('hoverEnabled')

      if (!hoverEnabled || !rotation) {
        console.error('Failed to get ViewModel properties')
        return
      }

      hoverEnabled.value = !deviceOrientationSupported

      function handleOrientation(event) {
        const gamma = event.gamma // Get the phone's left/right tilt, -90 to +90
        // @ts-ignore
        rotation.value = gamma
      }

      if (deviceOrientationSupported) {
        // If device orientation is supported, listen for device orientation events
        window.addEventListener('deviceorientation', handleOrientation)
      }
    },
  })
}

setup()
