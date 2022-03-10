import {
  GoogleMapProps as OriginGoogleMapProps,
  MarkerProps as OriginMarkerProps,
  PolylineProps as OriginPolylineProps,
  PolygonProps as OriginPolygonProps
} from '@react-google-maps/api'
import { StyleProp, ViewStyle } from 'react-native'
import { LatLng, Point, Region, MapEvent, Camera } from 'react-native-maps'
import { MAP_TYPE_MAPS } from './config'

export type GoogleMapProps = Omit<OriginGoogleMapProps,
'center' |
'onClick' |
'onDblClick' |
'onDrag' |
'onDragEnd' |
'onLoad'
>

export interface MapViewHandle {
  getCamera: () => Camera
  setCamera: (camera: Camera) => void
  animateCamera: (camera: Camera) => void
  animateToRegion: (region: Region) => void
}

export interface MapViewProps extends GoogleMapProps {
  style?: StyleProp<ViewStyle>
  /**
   * center
   */
  region?: Region
  initialRegion?: Region
  /**
   * options.gestureHandling = 'none'
   */
  zoomEnabled?: boolean
  /**
   * options.disableDoubleClickZoom
   */
  zoomTapEnabled?: boolean
  /**
   * options.zoomControl
   */
  zoomControlEnabled?: boolean
  /**
   * options.maxZoom/minZoom
   */
  minZoomLevel?: number
  maxZoomLevel?: number
  /**
   * options.mapTypeId
   */
  mapType?: keyof typeof MAP_TYPE_MAPS
  /**
   * options.styles
   */
  customMapStyle?: google.maps.MapTypeStyle[]
  /**
   * onLoad
   */
  onMapReady?: () => void
  /**
   * onDrag, onZoomChanged
   */
  onRegionChange?: (region: Region, details?: { isGesture: boolean }) => void
  /**
    * onDragEnd, onZoomChanged
    */
  onRegionChangeComplete?: (region: Region, details?: { isGesture: boolean }) => void
  /**
   * onClick
   */
  onPress?: (event: MapEvent) => void
  /**
   * onDblClick
   */
  onDoublePress?: (event: MapEvent) => void
  /**
   * onDrag
   */
  onPanDrag?: (event: MapEvent) => void
}

export interface MarkerProps extends Omit<OriginMarkerProps, 'position' | 'onClick' | 'onDrag' | 'onDragStart' | 'onDragEnd'> {
  /**
   * position
   */
  coordinate: LatLng
  /**
   * icon
   */
  image?: string
  icon?: string
  /**
   * google.maps.Icon.origin
   */
  anchor?: Point
  onPress?: (event: MapEvent<{ action: 'marker-press' }>) => void
  /**
   * onDrag, onDragStart, onDragEnd
   */
  onDrag?: (event: MapEvent) => void
  onDragStart?: (event: MapEvent) => void
  onDragEnd?: (event: MapEvent) => void
  /**
   * options.scaledSize
   */
  scaledSize?: { width: number, height: number }
}

export interface PolylineProps extends Omit<OriginPolylineProps, 'path' | 'onClick'> {
  coordinates: LatLng[]
  strokeWidth?: number
  strokeColor?: string
  geodesic?: boolean
  tappable?: boolean
  onPress?: (event: MapEvent) => void
}

export interface PolygonProps extends Omit<OriginPolygonProps, 'path' | 'paths' | 'onClick'> {
  coordinates: LatLng[]
  holes: LatLng[][]
  strokeWidth?: number
  strokeColor?: string
  fillColor?: string
  geodesic?: boolean
  tappable?: boolean
  onPress?: (event: MapEvent) => void
}
