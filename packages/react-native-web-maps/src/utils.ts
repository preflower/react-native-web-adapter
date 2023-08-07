export function calcZoom (longitudeDelta: number): number {
  return Math.round(Math.log(360 / longitudeDelta) / Math.LN2)
}

function calcLongitudeDelta (zoom: number): number {
  const power = Math.log2(360) - zoom
  return Math.pow(2, power)
}

interface Delta {
  longitudeDelta: number
  latitudeDelta: number
}

/**
 * zoom reverse delta
 * @param deltaRatio latitudeDelta / longitudeDelta result
 */
export function zoomReverseDelta (zoom: number, deltaRatio: number): Delta {
  const longitudeDelta = calcLongitudeDelta(zoom)
  return {
    longitudeDelta,
    latitudeDelta: longitudeDelta * deltaRatio
  }
}
