import { FunctionComponent, useMemo } from 'react'
import { Polyline as OriginPolyline } from '@react-google-maps/api'
import { PolylineProps } from './types'

const Polyline: FunctionComponent<PolylineProps> = ({
  coordinates = [],
  strokeWidth = 1,
  strokeColor = 'rgba(0,0,0,0.5)',
  geodesic = false,
  tappable = false,
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
  const options = useMemo(() => {
    return Object.assign({
      strokeWeight: strokeWidth,
      strokeColor: strokeColor,
      geodesic: geodesic,
      clickable: tappable
    }, provideOptions)
  }, [provideOptions, strokeWidth, strokeColor, geodesic, tappable])

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
    <OriginPolyline
      path={path}
      options={options}
      onClick={onClick}
      {...props}
    />
  )
}

export default Polyline
