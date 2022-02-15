import { Image } from 'react-native'
import { Source } from 'react-native-fast-image'

type FastImageWithStatic = typeof Image & {
  resizeMode: typeof resizeMode
  priority: typeof priority
  cacheControl: typeof cacheControl
  preload: (sources: Source[]) => void
  clearMemoryCache: () => Promise<void>
  clearDiskCache: () => Promise<void>
}

enum cacheControl {
  immutable = 'immutable',
  web = 'web',
  cacheOnly = 'cacheOnly'
}

enum priority {
  low = 'low',
  normal = 'normal',
  high = 'high'
}

enum resizeMode {
  contain = 'contain',
  cover = 'cover',
  stretch = 'stretch',
  center = 'center'
}

const FastImage = Image as FastImageWithStatic

FastImage.preload = function (sources: Source[]): void {
  sources.forEach(source => {
    if (source.uri != null) {
      void Image.prefetch(source.uri)
    }
  })
}

FastImage.clearMemoryCache = async function (): Promise<void> {
  return await Promise.reject(new Error('[warning]: web not support clear memnory cache'))
}

FastImage.clearDiskCache = async function (): Promise<void> {
  return await Promise.reject(new Error('[warning]: web not support clear disk cache'))
}

FastImage.resizeMode = resizeMode

FastImage.priority = priority

FastImage.cacheControl = cacheControl

export default FastImage
