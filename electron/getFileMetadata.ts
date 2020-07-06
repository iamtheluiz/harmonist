import NodeID3 from 'node-id3'

interface Metadata {
  title: string | null,
  artist: string | null,
  album: string | null,
  image: unknown
}

export default function (file: string): Metadata {
  try {
    const { title = null, artist = null, album = null, image } = NodeID3.read(file)

    return {
      title,
      artist,
      album,
      image
    }
  } catch (error) {
    return {
      title: '',
      artist: '',
      album: '',
      image: ''
    }
  }
}
