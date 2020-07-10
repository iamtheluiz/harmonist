import React, { useContext, useEffect, FormEvent, useState } from 'react'
import Swal from 'sweetalert2'
import FileContext from '../../contexts/file'
import { useHistory } from 'react-router-dom'
import { FiArrowLeft, FiMusic } from 'react-icons/fi'
import { remote, ipcRenderer } from 'electron'
import fs from 'fs'
import path from 'path'

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

interface SelectedImage {
  mime: string,
  imageBuffer: Buffer | null,
  type: {
    id: number,
    name: string
  },
  description?: string,
  url: string
}

const File: React.FC = () => {
  const { metadata, file, setMetadata } = useContext(FileContext)
  const [image, setImage] = useState<string>('')
  const [selectedImage, setSelectedImage] = useState<SelectedImage>({
    mime: '',
    imageBuffer: null,
    type: {
      id: 3,
      name: 'front cover'
    },
    description: '',
    url: ''
  })
  const history = useHistory()

  useEffect(() => {
    if (file === '') {
      history.push('/')
    }
  }, [])

  function handleReturnToHome () {
    history.push('/')
  }

  function handleSelectCover () {
    remote.dialog.showOpenDialog({
      properties: ['openFile'],
      filters: [
        {
          extensions: ['jpg', 'png'],
          name: 'Image'
        }
      ]
    })
      .then(selectedFile => {
        try {
          const fileLocation = selectedFile.filePaths[0]
          setImage(fileLocation)

          const fileBuffer = fs.readFileSync(fileLocation)
          const ext = path.extname(fileLocation).split('.')[1]

          const imageString = btoa(String.fromCharCode.apply(null, fileBuffer.toJSON().data))

          setSelectedImage({
            ...selectedFile,
            type: {
              id: 3,
              name: 'front cover'
            },
            mime: ext,
            imageBuffer: fileBuffer,
            url: `data:image/${ext};base64,${imageString}`
          })
        } catch (error) {
          Swal.fire({
            title: 'Error',
            text: 'Could not get file cover',
            icon: 'error'
          })
        }
      })
  }

  function handleSubmit (event: FormEvent) {
    event.preventDefault()

    const { title, album, artist } = metadata

    const data: { title?: string, artist?: string, album?: string, image?: unknown, APIC?: unknown } = {}

    if (title !== '') {
      data.title = title
    }
    if (artist !== '') {
      data.artist = artist
    }
    if (album !== '') {
      data.album = album
    }
    if (image !== '') {
      data.image = selectedImage
      data.APIC = image
    }

    try {
      const response = ipcRenderer.sendSync('setMusicMetadata', {
        file,
        metadata: data
      })

      if (response) {
        Swal.fire({
          title: 'Success',
          text: 'Your file data has been updated',
          icon: 'success',
          onClose: () => {
            history.push('/')
          }
        })
      } else {
        Swal.fire({
          title: 'Error',
          text: 'Could not update file data',
          icon: 'error'
        })
      }
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'Could not update file data',
        icon: 'error'
      })
    }
  }

  return (
    <Container>
      <Header>
        <NavigationButton onClick={handleReturnToHome}>
          <FiArrowLeft size={20} color="#FFF" />
        </NavigationButton>
      </Header>
      <Form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={handleSubmit}>
        <FileSelectionContainer onClick={handleSelectCover}>
          {(metadata.image !== '' || image !== '') ? (
            <Cover src={image !== '' ? selectedImage.url : metadata.image} />
          ) : (
            <FiMusic size={60} />
          )}
        </FileSelectionContainer>

        <InputField>
          <Label htmlFor="title">Title</Label>
          <Input
            type="text"
            id="title"
            value={metadata.title}
            onChange={event => setMetadata({
              ...metadata,
              title: event.target.value
            })}
          />
        </InputField>

        <InputField>
          <Label htmlFor="artist">Artist</Label>
          <Input
            type="text"
            id="artist"
            value={metadata.artist}
            onChange={event => setMetadata({
              ...metadata,
              artist: event.target.value
            })}
          />
        </InputField>

        <InputField>
          <Label htmlFor="album">Album</Label>
          <Input
            type="text"
            id="album"
            value={metadata.album}
            onChange={event => setMetadata({
              ...metadata,
              album: event.target.value
            })}
          />
        </InputField>

        <FormButton type="submit">Submit</FormButton>
      </Form>
    </Container>
  )
}

export default File
