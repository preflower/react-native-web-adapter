# react-native-web-maps

[![npm version](https://badge.fury.io/js/@preflower%2Freact-native-web-maps.svg)](https://www.npmjs.com/package/@preflower/react-native-web-maps)
[![npm download](https://img.shields.io/npm/dt/@preflower/react-native-web-maps)](https://www.npmjs.com/package/@preflower/react-native-web-maps)
![license](https://badgen.net/npm/license/@preflower/react-native-web-maps)

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

## Support Components
`react-native-web-maps` only override 👇 components, and export all other `@react-google-maps/api` apis

### **MapView**

| Prop              	| Support 	| Note                                                                                   	|
|--------------------	|---------	|----------------------------------------------------------------------------------------	|
| region             	| ⭕️       	|                                                                                        	|
| initialRegion      	| ⭕️       	|                                                                                        	|
| mapType            	| ⭕️       	|                                                                                        	|
| customMapStyle     	| ⭕️       	|                                                                                        	|
| zoomEnabled        	| ½⭕️      	| different with react-native-maps, gesture (scroll and zoom) will be blocked when false 	|
| zoomTapEnabled     	| ⭕️       	|                                                                                        	|
| zoomControlEnabled 	| ⭕️       	|                                                                                        	|
| minZoomLevel       	| ⭕️       	|                                                                                        	|
| maxZoomLevel       	| ⭕️       	|                                                                                        	|


| Event                 	| Support 	|
|------------------------	|---------	|
| onMapReady             	| ⭕️       	|
| onRegionChange         	| ⭕️       	|
| onRegionChangeComplete 	| ⭕️       	|
| onPress                	| ⭕️       	|
| onDoublePress          	| ⭕️       	|
| onPanDrag              	| ⭕️       	|


| Method          	| Support 	|
|-----------------	|---------	|
| getCamera       	| ⭕️       	|
| animateCamera   	| ⭕️       	|
| setCamera       	| ⭕️       	|
| animateToRegion 	| ⭕️       	|

### **Marker**

| Prop     	| Support 	| Note                           	|
|------------	|---------	|--------------------------------	|
| image      	| ⭕️       	| consistent with icon property  	|
| icon       	| ⭕️       	| consistent with image property 	|
| coordinate 	| ⭕️       	|                                	|
| anchor     	| ⭕️       	|                                	|
| draggable  	| ⭕️       	|                                	|
| opacity    	| ⭕️       	|                                	|


| Event       	| Support 	|
|-------------	|---------	|
| onPress     	| ⭕️       	|
| onDrag      	| ⭕️       	|
| onDragStart 	| ⭕️       	|
| onDragEnd   	| ⭕️       	|

### **Polygon**


| Prop        	| Support 	| Note 	|
|-------------	|---------	|------	|
| coordinates 	| ⭕️       	|      	|
| strokeWidth 	| ⭕️       	|      	|
| strokeColor 	| ⭕️       	|      	|
| fillColor   	| ⭕️       	|      	|
| geodesic    	| ⭕️       	|      	|
| tappable    	| ⭕️       	|      	|


| Event       	| Support 	|
|-------------	|---------	|
| onPress     	| ⭕️       	|

### **Polyline**

| Prop        	| Support 	| Note 	|
|-------------	|---------	|------	|
| coordinates 	| ⭕️       	|      	|
| strokeWidth 	| ⭕️       	|      	|
| strokeColor 	| ⭕️       	|      	|
| geodesic    	| ⭕️       	|      	|
| tappable    	| ⭕️       	|      	|


| Event       	| Support 	|
|-------------	|---------	|
| onPress     	| ⭕️       	|

## Notice

- In addition to `style`, other style property (such as `mapContainerStyle`) not support React-Native StyleSheet, because react-native-web convert it into class, it will result exception

## Develop Plan

At present, library is only used by myself, so i only developed the features that i needed,
if someone needs feature that currently not supported, please commit issue or PR to let me know.

## License

MIT
