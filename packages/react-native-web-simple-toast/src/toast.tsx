import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { CSSTransition } from 'react-transition-group'
import './toast.css'
import { createElAppendBody, unmount } from './utils'

export enum ToastDuation {
  LONG = 3500,
  SHORT = 2000
}

export enum ToastPosition {
  TOP = 'top',
  CENTER = 'center',
  BOTTOM = 'bottom'
}

interface ToastProps {
  message: string
  duration?: number
  gravity?: ToastPosition
  onExited?: () => any
}

const Toast: React.FC<ToastProps> = (props) => {
  const { message, duration = ToastDuation.SHORT, gravity = ToastPosition.BOTTOM } = props
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(true)
  }, [])

  return (
    <CSSTransition
      in={visible}
      timeout={300}
      mountOnEnter
      unmountOnExit
      className={`i-toast__wrapper i-toast__wrapper--position-${gravity}`}
      classNames={{
        enter: 'i-toast__wrapper--enter',
        exit: 'i-toast__wrapper--exit'
      }}
      onEnter={() => {
        if (duration != null) {
          setTimeout(() => setVisible(false), duration)
        }
      }}
      onExited={props.onExited}
    >
      <div>
        <div className='i-toast'>
          {message}
        </div>
      </div>
    </CSSTransition>
  )
}

export function show (message: string, duration?: number): void {
  showGravity(message, duration)
}

export function showGravity (message: string, duration?: number, gravity?: ToastPosition): void {
  const el = createElAppendBody()

  ReactDOM.render(
    <Toast
      message={message}
      duration={duration}
      gravity={gravity}
      onExited={() => {
        unmount(el)
      }}
    />,
    el
  )
}
