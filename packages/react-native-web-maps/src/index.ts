import MapView from './map-view'
import Marker from './marker'
import Polygon from './polygon'
import Polyline from './polyline'

interface Components {
  Marker?: typeof Marker
  Polyline?: typeof Polyline
  Polygon?: typeof Polygon
}

const GlobalMapView: typeof MapView & Components = MapView

GlobalMapView.Marker = Marker
GlobalMapView.Polyline = Polyline
GlobalMapView.Polygon = Polygon

export default MapView

export { LoadScript } from '@react-google-maps/api'
export { default as Marker } from './marker'
export { default as Polyline } from './polyline'
export { default as Polygon } from './polygon'
export * from './types'
