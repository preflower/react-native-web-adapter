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

export { default as Marker } from './marker'
export { default as Polyline } from './polyline'
export { default as Polygon } from './polygon'
export * from './types'
export {
  Autocomplete,
  AutocompleteProps,
  BicyclingLayer,
  BicyclingLayerProps,
  Circle,
  CircleProps,
  Data,
  DataProps,
  DirectionsRenderer,
  DirectionsRendererProps,
  DirectionsService,
  DirectionsServiceProps,
  DistanceMatrixService,
  DistanceMatrixServiceProps,
  DrawingManager,
  DrawingManagerProps,
  GoogleMap,
  GoogleMapProps,
  GoogleMarkerClusterer,
  GoogleMarkerClustererProps,
  GroundOverlay,
  GroundOverlayProps,
  HeatmapLayer,
  HeatmapLayerProps,
  InfoBox as InfoBoxComponent,
  InfoBoxProps,
  InfoWindow,
  InfoWindowProps,
  KmlLayer,
  KmlLayerProps,
  LoadScript,
  LoadScriptNext,
  LoadScriptNextProps,
  LoadScriptProps,
  MapContext,
  MarkerClusterer as ClustererComponent,
  MarkerClustererProps as ClustererProps,
  MarkerProps,
  OverlayView,
  OverlayViewProps,
  PolygonProps,
  PolylineProps,
  Rectangle,
  RectangleProps,
  StandaloneSearchBox,
  StandaloneSearchBoxProps,
  StreetViewPanorama,
  StreetViewPanoramaProps,
  StreetViewService,
  StreetViewServiceProps,
  TrafficLayer,
  TrafficLayerProps,
  TransitLayer,
  TransitLayerProps,
  useGoogleMap,
  useJsApiLoader,
  useLoadScript
} from '@react-google-maps/api'
