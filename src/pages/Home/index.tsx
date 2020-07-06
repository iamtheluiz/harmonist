import React, { useState, useEffect } from 'react'
import { FiImage } from 'react-icons/fi'
import { Button } from '../../styles/GlobalStyle'
import { Container, FileSelectionContainer, Cover, FileName } from './styles'
import { remote, ipcRenderer } from 'electron'
import path from 'path'

interface FileMetadata {
  title: string;
  artist: string;
  album: string;
  image: string;
}

const Home: React.FC = () => {
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
  )
}

export default Home
