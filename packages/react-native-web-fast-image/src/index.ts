import { Image } from 'react-native'
import { Source } from 'react-native-fast-image'

declare const cacheControl: {
  readonly immutable: 'immutable'
  readonly web: 'web'
  readonly cacheOnly: 'cacheOnly'
}

declare const priority: {
  readonly low: 'low'
  readonly normal: 'normal'
  readonly high: 'high'
}

declare const resizeMode: {
  readonly contain: 'contain'
  readonly cover: 'cover'
  readonly stretch: 'stretch'
  readonly center: 'center'
}

class FastImage extends Image {
  static preload (sources: Source[]): void {
    sources.forEach(source => {
      if (source.uri != null) {
        void Image.prefetch(source.uri)
      }
    })
  }

  static async clearMemoryCache (): Promise<void> {
    return await Promise.reject(new Error('[warning]: web not support clear memnory cache'))
  }

  static async clearDiskCache (): Promise<void> {
    return await Promise.reject(new Error('[warning]: web not support clear disk cache'))
  }

  static resizeMode = resizeMode

  static priority = priority

  static cacheControl = cacheControl
}

export default FastImage
