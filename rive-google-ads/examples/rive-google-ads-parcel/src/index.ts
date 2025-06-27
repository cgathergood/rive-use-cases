import { Rive, Fit, Layout } from '@rive-app/canvas-single'
import { deviceOrientationSupported } from './deviceOrientationSupported'

// const BikeFile = new URL('/assets/sport_bike_ad.riv', import.meta.url)
const WorldCreatorFile = new URL('/assets/world_creator.riv', import.meta.url)

// ---------------------------------
// HTML Canvas element to render to
const riveCanvas = document.getElementById('riveCanvas') as HTMLCanvasElement

// ---------------------------------
// Resize on widow
function resizeRiveCanvas(riveInstance: Rive) {
  window.addEventListener(
    'resize',
    () => {
      riveInstance.resizeDrawingSurfaceToCanvas()
    },
    false
  )
}

// ---------------------------------
// Randomly select a Rive file
function getRandomRiveFile(): URL {
  const files = [WorldCreatorFile]
  const randomIndex = Math.floor(Math.random() * files.length)
  return files[randomIndex]
}

async function loadRiveFile() {
  const RiveFileToLoad = getRandomRiveFile()
  return await (await fetch(new Request(RiveFileToLoad))).arrayBuffer()
}

async function setup() {
  const bytes = await loadRiveFile()

  const useGyroscope = await deviceOrientationSupported()

  const riveInstance = new Rive({
    buffer: bytes,
    autoplay: true,
    autoBind: true,
    canvas: riveCanvas,
    layout: new Layout({
      fit: Fit.Layout,
      layoutScaleFactor: 1,
    }),
    stateMachines: ['State Machine 1'],
    onLoad: () => {
      resizeRiveCanvas(riveInstance)
      // Prevent a blurry canvas by using the device pixel ratio
      riveInstance.resizeDrawingSurfaceToCanvas()
    },
  })
}

setup()
