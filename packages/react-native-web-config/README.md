# react-native-web-config

[![npm version](https://badge.fury.io/js/react-native-web-config.svg)](https://badge.fury.io/js/react-native-web-config)

[react-native-config](https://github.com/luggit/react-native-config) for Web.

## Overview
Inspired by [react-web-config](https://github.com/tanhauhau/react-web-config)

This repository purpose is to repair `react-web-config` not support webpack 3 or above version error.

## Usage
```bash
$ npm i react-native-web-config
```

webpack.config.js
```diff
  const webpack = require('webpack');
+ const ReactNativeWebConfig = require('react-native-web-config/plugin');
+ const path = require('path');
+ /* .env is default name, if you set custom name please replace it */
+ const envFilePath = path.resolve(__dirname, '.env');
  module.exports = {
    ...
    plugins: [
      ...
+     /* define __REACT_NATIVE_WEB_CONFIG__ */
+     ReactNativeWebConfig(envFilePath)
    ],
    resolve: [
      alias: [
        ...
        'react-native': 'react-native-web',
+       /* set alias from react-native-config to react-native-web-config */
+       'react-native-config': 'react-native-web-config'
      ]
    ]
  }
```

## License
MIT
