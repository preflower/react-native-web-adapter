module.exports = {
  presets: [
    'module:metro-react-native-babel-preset',
    ['@babel/preset-react', {
      runtime: 'automatic'
    }]
  ],
  plugins: [
    [
      'module-resolver',
      {
        root: [
          './src'
        ],
        alias: {
          '@': './src'
        }
      }
    ]
  ]
}
