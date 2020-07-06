import React, { useState } from 'react'
import FileMetadata from '../types/Metadata'

interface FileContextData {
  file: string,
  metadata: FileMetadata,
  setFile(arg0: string): void,
  setMetadata(arg0: FileMetadata): void
}

const FileContext = React.createContext<FileContextData>({} as FileContextData)

export const FileProvider: React.FC = ({ children }) => {
  const [file, setFile] = useState<string>('')
  const [metadata, setMetadata] = useState<FileMetadata>({
    title: '',
    artist: '',
    album: '',
    image: ''
  })

  return (
    <FileContext.Provider value={{
      file,
      metadata,
      setFile,
      setMetadata
    }}>
      {children}
    </FileContext.Provider>
  )
}

export default FileContext
