async function deviceOrientationSupported() {
  if (
    typeof DeviceOrientationEvent !== 'undefined' &&
    typeof (DeviceOrientationEvent as any).requestPermission === 'function'
  ) {
    // For Safari on iOS or WebView on iOS
    try {
      const response = await (DeviceOrientationEvent as any).requestPermission()
      if (response === 'granted') {
        console.log('Device Orientation permission granted')
        return true
      } else {
        console.log('Device Orientation permission denied - iOS')
        return false
      }
    } catch (err) {
      console.error(err)
    }
  } else {
    // Android or desktop (no prompt needed)
    console.log(
      'Device Orientation permission granted by default - Android or desktop'
    )
    return true
  }
}

export { deviceOrientationSupported }
