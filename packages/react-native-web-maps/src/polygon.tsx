import { FunctionComponent, useMemo } from 'react'
import { Polygon as OriginPolygon } from '@react-google-maps/api'
import { PolygonProps } from './types'

const Polygon: FunctionComponent<PolygonProps> = ({
  coordinates = [],
  holes = [],
  strokeWidth = 1,
  strokeColor = 'rgba(0,0,0,0.5)',
  geodesic = false,
  tappable = false,
  fillColor = 'rgba(0,0,0,0.5)',
  options: provideOptions,
  onPress,
  ...props
}) => {
  const path = useMemo(() => {
    return coordinates.map(item => ({
      lat: item.latitude,
      lng: item.longitude
    }))
  }, [coordinates])
  const paths = useMemo(() => {
    return holes.map(hole => hole.map(item => ({
      lat: item.latitude,
      lng: item.longitude
    })))
  }, [holes])
  const options = useMemo(() => {
    return Object.assign({
      strokeWeight: strokeWidth,
      strokeColor: strokeColor,
      fillColor: fillColor,
      geodesic: geodesic,
      clickable: tappable
    }, provideOptions)
  }, [provideOptions, strokeWidth, strokeColor, fillColor, geodesic, tappable])

  const onClick = (e: google.maps.MapMouseEvent): void => {
    onPress?.({
      // @ts-expect-error
      // nativeEvent not support position
      nativeEvent: {
        coordinate: {
          latitude: e.latLng!.lat(),
          longitude: e.latLng!.lng()
        }
      }
    })
  }

  return (
    <OriginPolygon
      path={path}
      paths={paths}
      options={options}
      onClick={onClick}
      {...props}
    />
  )
}

export default Polygon
