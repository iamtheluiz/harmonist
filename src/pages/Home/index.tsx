import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { FiImage } from 'react-icons/fi'
import { Button } from '../../styles/GlobalStyle'
import { Container, FileSelectionContainer, Cover, FileName } from './styles'
import { remote, ipcRenderer } from 'electron'
import path from 'path'
import FileMetadata from '../../types/Metadata'

interface Props {
  context: {
    file: string,
    metadata: FileMetadata,
    setFile: (arg0: string) => void,
    setMetadata: (arg0: FileMetadata) => void
  }
}

const Home: React.FC<Props> = (props) => {
  const history = useHistory()

  useEffect(() => {
    if (props.context.file !== '') {
      const data = ipcRenderer.sendSync('getMusicMetadata', props.context.file)

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

      props.context.setMetadata(data)
    }
  }, [props.context.file])

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
        props.context.setFile(file.filePaths[0])
      })
  }

  function handleConfirmFile () {
    history.push('/file')
  }

  return (
    <Container>
      <FileSelectionContainer onClick={handleFileDialog}>
        {props.context.metadata?.image !== '' ? (
          <Cover src={props.context.metadata?.image} />
        ) : (
          <FiImage size={60} />
        )}
      </FileSelectionContainer>
      {props.context.file && (
        <FileName>{path.basename(props.context.file)}</FileName>
      )}
      <Button onClick={handleConfirmFile}>Confirmar Arquivo</Button>
    </Container>
  )
}

export default Home
