import React from 'react'
import { remote } from 'electron'
import { FiX, FiMinus, FiMaximize } from 'react-icons/fi'

import { Container, Button } from './styles'

const Header: React.FC = () => {
  function handleCloseWindow () {
    const window = remote.getCurrentWindow()

    window.close()
  }

  function handleMaximizeWindow () {
    const window = remote.getCurrentWindow()

    const { width: currentWidth, height: currentHeight } = window.getBounds()
    const { width: maxWidth, height: maxHeight } = remote.screen.getPrimaryDisplay().workAreaSize

    const isMaximized = (currentWidth === maxWidth && currentHeight === maxHeight)

    if (!isMaximized) {
      window.maximize()
    } else {
      window.unmaximize()
    }
  }

  function handleMinimizeWindow () {
    const window = remote.getCurrentWindow()

    window.minimize()
  }

  return (
    <Container>
      <Button onClick={handleMinimizeWindow}>
        <FiMinus />
      </Button>
      <Button onClick={handleMaximizeWindow}>
        <FiMaximize />
      </Button>
      <Button onClick={handleCloseWindow}>
        <FiX />
      </Button>
    </Container>
  )
}

export default Header
