export const DEFAULT_REGION = {
  latitude: 52.5063615,
  longitude: 13.3362866,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421
}

/**
 * Google Maps Default Options
 * to ensure that consistent with react-native-maps
 */
export const DEFAULT_OPTIONS = {
  fullscreenControl: false,
  mapTypeControl: false,
  streetViewControl: false
}

export const MAP_TYPE_MAPS = {
  standard: 'roadmap', // google.maps.MapTypeId.ROADMAP
  satellite: 'satellite', // google.maps.MapTypeId.SATELLITE
  hybrid: 'hybrid', // google.maps.MapTypeId.HYBRID
  terrain: 'terrain' // google.maps.MapTypeId.TERRAIN
}
