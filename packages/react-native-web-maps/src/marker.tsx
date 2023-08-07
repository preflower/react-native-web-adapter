import React, { useMemo } from 'react'
import { Marker as OriginMarker } from '@react-google-maps/api'
import { MarkerProps } from './types'

const Marker: React.FC<MarkerProps> = ({
  coordinate,
  anchor = {
    x: 0.5,
    y: 1
  },
  image,
  icon: provideIcon,
  scaledSize,
  onPress,
  onDrag: provideOnDrag,
  onDragStart: provideOnDragStart,
  onDragEnd: provideOnDragEnd,
  ...props
}) => {
  const icon: google.maps.Icon | undefined = useMemo(() => {
    const url = image ?? provideIcon
    if (url != null) {
      const i: google.maps.Icon = {
        url,
        origin: new google.maps.Point(anchor.x, anchor.y)
      }
      if (scaledSize != null) {
        i.scaledSize = new google.maps.Size(scaledSize.height, scaledSize.width)
      }
      return i
    }
  }, [anchor, image, provideIcon, scaledSize])

  const onClick = (e: google.maps.MapMouseEvent): void => {
    onPress?.({
      // @ts-expect-error
      // nativeEvent not support position
      nativeEvent: {
        action: 'marker-press',
        coordinate: {
          latitude: e.latLng!.lat(),
          longitude: e.latLng!.lng()
        }
      }
    })
  }

  const onDrag = (e: google.maps.MapMouseEvent): void => {
    provideOnDrag?.({
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

  const onDragStart = (e: google.maps.MapMouseEvent): void => {
    provideOnDragStart?.({
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

  const onDragEnd = (e: google.maps.MapMouseEvent): void => {
    provideOnDragEnd?.({
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
    <OriginMarker
      position={{
        lat: coordinate.latitude,
        lng: coordinate.longitude
      }}
      icon={icon}
      onClick={onClick}
      onDrag={onDrag}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      {...props}
    />
  )
}

export default Marker
