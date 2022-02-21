# react-native-web-simple-toast

[![npm version](https://badge.fury.io/js/react-native-web-simple-toast.svg)](https://badge.fury.io/js/react-native-web-simple-toast)

[react-native-simple-toast](https://github.com/vonovak/react-native-simple-toast) for Web.

## Overview
`react-native-web-simple-toast` allow you to using `react-native-simple-toast` seamlessly on the web.

`react-native-web-simple-toast` simulate iOS style, and don't support `viewControllerBlacklist` params.

## Usage
```bash
npm i react-native-web-simple-toast
```

index.web.{tsx,jsx}
```
import `react-native-simple-toast/dist/index.css`
```

webpack.config.js
```diff
  module.exports = {
    ...
    resolve: [
      alias: [
        ...
        'react-native': 'react-native-web',
+       /* set alias from react-native-simple-toast to react-native-web-simple-toast */
+       'react-native-simple-toast': 'react-native-web-simple-toast'
      ]
    ]
  }
```

## License
MIT
