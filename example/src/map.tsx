import { useEffect, useRef } from 'react'
import MapView, { LoadScript, Marker, MapViewHandle, Polyline, Polygon } from '@preflower/react-native-web-maps'

function Map (): JSX.Element {
  const map = useRef<MapViewHandle | null>(null)
  const polygons = [
    {
      id: 1,
      coordinates: [
        {
          latitude: 50.52,
          longitude: 13.3362866
        }, {
          latitude: 50.52,
          longitude: 11.3362866
        }
      ],
      holes: [
        [
          {
            latitude: 50.52,
            longitude: 11
          },
          {
            latitude: 50.52,
            longitude: 12
          }, {
            latitude: 50.52,
            longitude: 13
          }
        ]
      ]
    }
  ]

  useEffect(() => {
    setTimeout(() => {
      // console.log(map.current?.getCamera())
      map.current?.animateToRegion({
        latitude: 52.52,
        longitude: 13.3362866,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      })
    }, 2000)
  }, [])

  return (
    <LoadScript googleMapsApiKey="">
      <div className="App">
        <MapView
          ref={map}
          style={{
            width: '100vw',
            height: '100vh'
          }}
          initialRegion={{
            latitude: 52.5063615,
            longitude: 13.3362866,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
          onMapReady={() => { console.log('onMapReady') }}
          onRegionChange={(region) => { console.log('onRegionChange', region) }}
          onRegionChangeComplete={(region) => { console.log('onRegionChangeComplete', region) }}
          onPress={(e) => { console.log('onPress', e.nativeEvent) }}
          onDoublePress={(e) => { console.log('onDoublePress', e.nativeEvent) }}
          onPanDrag={(e) => { console.log('onPanDrag', e.nativeEvent) }}
        >
          <Marker
            coordinate={{
              latitude: 52.5063615,
              longitude: 13.3362866
            }}
            scaledSize={{
              width: 40,
              height: 41
            }}
            onDrag={(e) => { console.log('onDrag Marker', e.nativeEvent) }}
            onDragStart={(e) => { console.log('onDragStart Marker', e.nativeEvent) }}
            onDragEnd={(e) => { console.log('onDragEnd Marker', e.nativeEvent) }}
            draggable
          />
          <Polyline
            coordinates={[
              {
                latitude: 52.5063615,
                longitude: 13.3362866
              },
              {
                latitude: 55.5063615,
                longitude: 20.3362866
              },
              {
                latitude: 70.5063615,
                longitude: 30.3362866
              }
            ]}
            strokeColor="#f50516"
            strokeWidth={3}
            tappable
            onPress={(e) => { console.log(e.nativeEvent) }}
          />
          {
            polygons.map(polygon => (
              <Polygon
                key={polygon.id}
                coordinates={polygon.coordinates}
                holes={polygon.holes}
                strokeColor="#F00"
                fillColor="rgba(255,0,0,0.5)"
                strokeWidth={1}
              />
            ))
          }
        </MapView>
      </div>
    </LoadScript>
  )
}

export default Map
