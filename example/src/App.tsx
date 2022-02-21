import Image from '@preflower/react-native-web-fast-image'
import './App.css'

function App (): JSX.Element {
  return (
    <div className="App">
      <header className="App-header">
        <Image source={{ uri: 'test' }}/>
      </header>
    </div>
  )
}

export default App
