import React, { useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { FiMusic } from 'react-icons/fi'
import { Button } from '../../styles/GlobalStyle'
import { Container, FileSelectionContainer, Cover, FileName } from './styles'
import { remote, ipcRenderer } from 'electron'
import path from 'path'
import FileContext from '../../contexts/file'

const Home: React.FC = () => {
  const { file, metadata, setFile, setMetadata } = useContext(FileContext)
  const history = useHistory()

  useEffect(() => {
    if (file !== '') {
      const data = ipcRenderer.sendSync('getMusicMetadata', file)
      const dataConfirm: { title ?: string, artist?: string, album?: string } = {}

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

      if (data.title === null) {
        dataConfirm.title = '-'
      }
      if (data.artist === null) {
        dataConfirm.artist = '-'
      }
      if (data.album === null) {
        dataConfirm.album = '-'
      }

      setMetadata({
        ...data,
        ...dataConfirm
      })
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

  function handleConfirmFile () {
    history.push('/file')
  }

  function handleClearFile () {
    setFile('')
    setMetadata({
      title: '',
      album: '',
      artist: '',
      image: ''
    })
  }

  return (
    <Container>
      <FileSelectionContainer onClick={handleFileDialog}>
        {metadata?.image !== '' ? (
          <Cover src={metadata?.image} />
        ) : (
          <FiMusic size={60} />
        )}
      </FileSelectionContainer>
      {file && (
        <>
          <FileName>{metadata.title ? metadata.title : path.basename(file)}</FileName>
          <Button onClick={handleConfirmFile}>Confirm File</Button>
          <Button onClick={handleClearFile} style={{
            backgroundColor: '#eb3434'
          }}>Remove Selection</Button>
        </>
      )}
    </Container>
  )
}

export default Home
