import React, { useState, useEffect } from 'react'
import { render } from 'react-dom'
import { FiImage } from 'react-icons/fi'
import { GlobalStyle, Container, FileSelectionContainer, Cover, FileName, Button } from './styles/GlobalStyle'
import { remote, ipcRenderer } from 'electron'
import path from 'path'

import Header from './components/Header'

const mainElement = document.createElement('div')
mainElement.setAttribute('id', 'root')
document.body.appendChild(mainElement)

interface FileMetadata {
  title: string;
  artist: string;
  album: string;
  image: string;
}

const App = () => {
  const [file, setFile] = useState<string>('')
  const [metadata, setMetadata] = useState<FileMetadata>({
    title: '',
    artist: '',
    album: '',
    image: ''
  })

  useEffect(() => {
    if (file !== '') {
      const data = ipcRenderer.sendSync('getMusicMetadata', file)

      try {
        if (data.image !== '') {
          const image = btoa(String.fromCharCode.apply(null, data.image.imageBuffer))

          data.image = `data:image/${data.image.mime};base64,${image}`
        } else {
          data.image = ''
        }
      } catch (error) {
        data.image = ''
      }

      setMetadata(data)
    }
  }, [file])

  function handleFileDialog () {
    remote.dialog.showOpenDialog({
      properties: ['openFile'],
      filters: [
        {
          extensions: ['mp3'],
          name: 'Music Filter'
        }
      ]
    })
      .then(file => {
        setFile(file.filePaths[0])
      })
  }

  return (
    <>
      <GlobalStyle />
      <Header />
      <Container>
        <FileSelectionContainer onClick={handleFileDialog}>
          {metadata?.image !== '' ? (
            <Cover src={metadata?.image} />
          ) : (
            <FiImage size={60} />
          )}
        </FileSelectionContainer>
        <FileName>{path.basename(file)}</FileName>
        <Button>Confirmar Arquivo</Button>
      </Container>
    </>
  )
}

render(<App />, mainElement)
