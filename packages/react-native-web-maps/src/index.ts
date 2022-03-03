import MapView from './map-view'
import Marker from './marker'

interface Components {
  Marker?: typeof Marker
}

const GlobalMapView: typeof MapView & Components = MapView

GlobalMapView.Marker = Marker

export default MapView

export { LoadScript } from '@react-google-maps/api'
export { default as Marker } from './marker'
export * from './types'
