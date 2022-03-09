# react-native-web-maps

[![npm version](https://badge.fury.io/js/@preflower%2Freact-native-web-maps.svg)](https://badge.fury.io/js/@preflower%2Freact-native-web-maps)

[react-native-maps](https://github.com/react-native-maps/react-native-maps) for Web.

## Overview
`react-native-web-maps` allow you to using `react-native-maps` seamlessly on the web, it base on [@react-google-maps/api](https://github.com/JustFly1984/react-google-maps-api).

## Usage
```bash
npm i @preflower/react-native-web-maps
```

webpack.config.js
```diff
  module.exports = {
    ...
    resolve: [
      alias: [
        ...
        'react-native': 'react-native-web',
+       /* set alias from react-native-maps to @preflower/react-native-web-maps */
+       'react-native-maps': '@preflower/react-native-web-maps'
      ]
    ]
  }
```

App.web.tsx/jsx
```
<!-- Before use Google Maps, you need to initialize it first -->
import { LoadScript } from '@preflower/react-native-web-maps'

const App = () => {
  return (
    <LoadScript googleMapsApiKey="...">
      ...content
    </LoadScript>
  )
}
```

## Components Support

### MapView
***
#### Props
- region
- initialRegion
- mapType
- customMapStyle
- zoomEnabled 
  > different with react-native-maps, gesture (scroll and zoom) will be blocked when false
- zoomTapEnabled
- zoomControlEnabled
- minZoomLevel
- maxZoomLevel

#### Events
- onMapReady
- onRegionChange
- onRegionChangeComplete
- onPress
- onDoublePress
- onPanDrag

#### Methods
- getCamera
- animateCamera
- setCamera
- animateToRegion

### Marker
***
### Props
- image
- icon
  > image and icon are identical, both accept local image
- coordinate
- anchor
- draggable
- opacity

### Events
- onPress
- onDrag
- onDragStart
- onDragEnd

## Notice
- all style property not support React-Native StyleSheet, because react-native-web
  convert it into class, it will result exception

## Develop Plan
At present, library is only used by myself, so i only developed the features that i needed,
if someone needs feature that currently not supported, please commit issue or PR to let me know.

## License
MIT
