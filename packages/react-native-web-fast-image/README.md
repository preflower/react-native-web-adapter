# react-native-web-fast-image

[![npm version](https://badge.fury.io/js/@preflower%2Freact-native-web-fast-image.svg)](https://badge.fury.io/js/@preflower%2Freact-native-web-fast-image)
[![npm download](https://img.shields.io/npm/dt/@preflower/react-native-web-fast-image)](https://www.npmjs.com/package/@preflower/react-native-web-fast-image)
![license](https://badgen.net/npm/license/@preflower/react-native-web-fast-image)

[react-native-fast-image](https://github.com/DylanVann/react-native-fast-image) for Web.

## Overview
`react-native-web-fast-image` allow you to using `react-native-fast-image` seamlessly on the web by adding one line webpack config

## Usage
```bash
$ npm i @preflower/react-native-web-fast-image
```

webpack.config.js
```diff
  module.exports = {
    ...
    resolve: [
      alias: [
        ...
        'react-native': 'react-native-web',
+       /* set alias from react-native-fast-image to react-native-web-fastimage */
+       'react-native-fast-image': '@preflower/react-native-web-fast-image'
      ]
    ]
  }
```

## License
MIT
