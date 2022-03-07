import MapView, { LoadScript, Marker, MapViewHandle } from '@preflower/react-native-web-maps'
import './App.css'
import { useEffect, useRef } from 'react'

function App (): JSX.Element {
  const map = useRef<MapViewHandle | null>(null)

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
    <LoadScript googleMapsApiKey="AIzaSyAcYur_B9FQCX7jN_GmK962RB3j5lUpg3g">
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
        </MapView>
      </div>
    </LoadScript>
  )
}

export default App
