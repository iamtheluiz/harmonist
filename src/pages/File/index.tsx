import React, { useContext, useEffect, FormEvent } from 'react'
import FileContext from '../../contexts/file'
import { useHistory } from 'react-router-dom'
import { FiArrowLeft, FiMusic } from 'react-icons/fi'
import { ipcRenderer } from 'electron'

import {
  Container,
  Header,
  NavigationButton,
  Form,
  FileSelectionContainer,
  Cover,
  InputField,
  Input,
  Label,
  FormButton
} from './styles'

const File: React.FC = () => {
  const context = useContext(FileContext)
  const history = useHistory()

  useEffect(() => {
    if (context.file === '') {
      history.push('/')
    }
  }, [])

  function handleReturnToHome () {
    history.push('/')
  }

  function handleSubmit (event: FormEvent) {
    event.preventDefault()
    const { title, artist, album } = context.metadata

    const metadata: { title?: string, artist?: string, album?: string } = {}

    if (title !== '') {
      metadata.title = title
    }
    if (artist !== '') {
      metadata.artist = artist
    }
    if (album !== '') {
      metadata.album = album
    }

    const response = ipcRenderer.sendSync('setMusicMetadata', {
      file: context.file,
      metadata
    })

    console.log(response)
  }

  return (
    <Container>
      <Header>
        <NavigationButton onClick={handleReturnToHome}>
          <FiArrowLeft size={20} color="#FFF" />
        </NavigationButton>
      </Header>
      <Form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={handleSubmit}>
        <FileSelectionContainer>
          {context.metadata.image !== '' ? (
            <Cover src={context.metadata.image} />
          ) : (
            <FiMusic size={60} />
          )}
        </FileSelectionContainer>

        <InputField>
          <Label htmlFor="title">Title</Label>
          <Input
            type="text"
            id="title"
            value={context.metadata.title}
            onChange={event => context.setMetadata({
              ...context.metadata,
              title: event.target.value
            })}
          />
        </InputField>

        <InputField>
          <Label htmlFor="artist">Artist</Label>
          <Input
            type="text"
            id="artist"
            value={context.metadata.artist}
            onChange={event => context.setMetadata({
              ...context.metadata,
              artist: event.target.value
            })}
          />
        </InputField>

        <InputField>
          <Label htmlFor="album">Album</Label>
          <Input
            type="text"
            id="album"
            value={context.metadata.album}
            onChange={event => context.setMetadata({
              ...context.metadata,
              album: event.target.value
            })}
          />
        </InputField>

        <FormButton type="submit">Enviar</FormButton>
      </Form>
    </Container>
  )
}

export default File
