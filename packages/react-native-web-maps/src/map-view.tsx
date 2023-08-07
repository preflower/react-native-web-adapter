import { ForwardedRef, forwardRef, useImperativeHandle, useMemo, useRef, useState } from 'react'
import { GoogleMap } from '@react-google-maps/api'
import { Region, Camera } from 'react-native-maps'
import { useUpdateEffect } from 'react-use'
import { View } from 'react-native'

import { calcZoom, zoomReverseDelta } from './utils'
import { DEFAULT_OPTIONS, MAP_TYPE_MAPS, DEFAULT_REGION } from './config'
import { MapViewHandle, MapViewProps } from './types'

const MapView = forwardRef(function MapView ({
  region,
  initialRegion,
  style,
  zoomEnabled = true,
  zoomControlEnabled = true,
  zoomTapEnabled = true,
  minZoomLevel,
  maxZoomLevel,
  mapType = 'standard',
  customMapStyle,
  options: provideOptions,
  onMapReady,
  onRegionChange,
  onRegionChangeComplete,
  onPress,
  onDoublePress,
  onPanDrag,
  ...props
}: MapViewProps, ref: ForwardedRef<MapViewHandle>) {
  const instance = useRef<google.maps.Map>()
  const options: google.maps.MapOptions = useMemo(() => {
    return Object.assign(DEFAULT_OPTIONS, {
      gestureHandling: zoomEnabled ? 'auto' : 'none',
      zoomControl: zoomControlEnabled,
      disableDoubleClickZoom: !zoomTapEnabled,
      mapTypeId: MAP_TYPE_MAPS[mapType],
      styles: customMapStyle,
      minZoom: minZoomLevel,
      maxZoom: maxZoomLevel
    }, provideOptions)
  }, [zoomEnabled, zoomControlEnabled, zoomTapEnabled, mapType, customMapStyle, minZoomLevel, maxZoomLevel, provideOptions])
  const [center, setCenter] = useState<google.maps.LatLngLiteral>(() => ({
    lat: region?.latitude ?? initialRegion?.latitude ?? DEFAULT_REGION.latitude,
    lng: region?.longitude ?? initialRegion?.longitude ?? DEFAULT_REGION.longitude
  }))
  const [zoom, setZoom] = useState<number>(() => {
    return calcZoom(region?.longitudeDelta ?? initialRegion?.longitudeDelta ?? DEFAULT_REGION.longitudeDelta)
  })
  const deltaRadio = useMemo(() => {
    return (region?.latitudeDelta ?? initialRegion?.latitudeDelta ?? DEFAULT_REGION.latitudeDelta) /
    (region?.longitudeDelta ?? initialRegion?.longitudeDelta ?? DEFAULT_REGION.longitudeDelta)
  }, [region])

  useImperativeHandle(ref, () => ({
    getCamera () {
      const center = instance.current!.getCenter()!
      return {
        center: {
          latitude: center.lat(),
          longitude: center.lng()
        },
        pitch: instance.current!.getTilt()!,
        altitude: 0, // it will be ignored by Google Maps
        heading: instance.current!.getHeading()!,
        zoom: instance.current!.getZoom()!
      }
    },
    /**
     * different with react-native-maps, no animation
     * @param {Camera}
     */
    animateCamera ({ center, ...others }: Camera) {
      instance.current?.moveCamera({
        center: {
          lat: center.latitude,
          lng: center.longitude
        },
        ...others
      })
    },
    setCamera ({ center, ...others }: Camera) {
      instance.current?.moveCamera({
        center: {
          lat: center.latitude,
          lng: center.longitude
        },
        ...others
      })
    },
    animateToRegion (region) {
      instance.current?.panTo({
        lat: region.latitude,
        lng: region.longitude
      })
    }
  }))

  useUpdateEffect(() => {
    setCenter({
      lat: region!.latitude,
      lng: region!.longitude
    })
    setZoom(calcZoom(region!.longitude))
  }, [region])

  const onLoad = (map: google.maps.Map): void => {
    instance.current = map
    onMapReady?.()
  }

  const getCurrentRegion = (): Region => {
    const zoom = instance.current!.getZoom()!
    const center = instance.current!.getCenter()!
    const delta = zoomReverseDelta(zoom, deltaRadio)
    return {
      latitude: center.lat(),
      latitudeDelta: delta.latitudeDelta,
      longitude: center.lng(),
      longitudeDelta: delta.longitudeDelta
    }
  }

  const onChangeComplete = (): void => {
    const _region = getCurrentRegion()
    onRegionChange?.(_region, { isGesture: true })
    onRegionChangeComplete?.(_region, { isGesture: true })
  }

  const onZoomChanged = (): void => {
    // fix onZoomChanged be triggered before onLoad callback
    if (instance.current == null) return

    onChangeComplete()
  }

  // ignore onIdle event when Map ready
  const hasIdleTriggerd = useRef(false)

  const onIdle = (): void => {
    if (!hasIdleTriggerd.current) {
      hasIdleTriggerd.current = true
      return
    }
    onChangeComplete()
  }

  const onDrag = (): void => {
    const _region = getCurrentRegion()
    onRegionChange?.(_region, { isGesture: true })
    onPanDrag?.({
      // @ts-expect-error
      // nativeEvent not support position
      nativeEvent: {
        coordinate: {
          latitude: _region.latitude,
          longitude: _region.longitude
        }
      }
    })
  }

  const onClick = (e: google.maps.MapMouseEvent): void => {
    onPress?.({
      // @ts-expect-error
      // nativeEvent not support position
      nativeEvent: {
        action: 'press',
        coordinate: {
          latitude: e.latLng!.lat(),
          longitude: e.latLng!.lng()
        }
      }
    })
  }

  const onDblClick = (e: google.maps.MapMouseEvent): void => {
    onDoublePress?.({
      // @ts-expect-error
      // nativeEvent not support position
      nativeEvent: {
        action: 'press',
        coordinate: {
          latitude: e.latLng!.lat(),
          longitude: e.latLng!.lng()
        }
      }
    })
  }

  return (
    <View style={style}>
      <GoogleMap
        mapContainerStyle={{ height: '100%' }}
        center={center}
        zoom={zoom}
        options={options}
        onLoad={onLoad}
        onZoomChanged={onZoomChanged}
        onDrag={onDrag}
        onClick={onClick}
        onDblClick={onDblClick}
        onIdle={onIdle}
        {...props}
      />
    </View>
  )
})

export default MapView
