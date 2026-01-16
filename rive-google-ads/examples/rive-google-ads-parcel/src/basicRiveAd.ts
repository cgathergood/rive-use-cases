import { Rive, Fit, Layout, RuntimeLoader } from '@rive-app/webgl2'

// Add your .riv file to the assets folder and update the name below
const AdFile = new URL('/assets/cal_update.riv', import.meta.url)
// const AdFile = new URL('/assets/sniffr-googlead-v3.riv', import.meta.url)
// This is the name of the state machine in the Rive file that we want to control
const stateMachineName = 'State Machine 1'
// This is how the Rive artboard should fit in the canvas (Fit.Layout is recommended for ads)
const fitType = Fit.Layout
// If you're using Fit.Layout, you can set a scale factor to adjust the size of the Rive artboard in the canvas
const layoutScaleFactor = 1

// -----------------------------------------------------
// You shouldn't need to change anything below this line
// -----------------------------------------------------

// Google Ads doesn't allow external resources, so we need to use the Rive WASM file bundled with the package
const riveWASMResource = `${new URL('/assets/rive.wasm', import.meta.url)}`
RuntimeLoader.setWasmUrl(riveWASMResource)

// HTML Canvas element to render to
const riveCanvas = document.getElementById('riveCanvas') as HTMLCanvasElement

// When the window is resized, resize the Rive canvas
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

  // Create a new Rive instance
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
    },
  })
}

setup()
