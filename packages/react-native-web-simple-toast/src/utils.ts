import ReactDOM from 'react-dom'

export function unmount (container: HTMLDivElement): void {
  const unmountResult = ReactDOM.unmountComponentAtNode(container)
  if (unmountResult && (container.parentNode != null)) {
    container.parentNode.removeChild(container)
  }
}

export function createElAppendBody (): HTMLDivElement {
  const el = document.createElement('div')
  document.body.appendChild(el)
  return el
}
