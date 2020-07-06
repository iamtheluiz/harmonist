/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useState } from 'react'
import { render } from 'react-dom'
import { GlobalStyle } from './styles/GlobalStyle'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import FileMetadata from './types/Metadata'

import Header from './components/Header'
import Home from './pages/Home'
import NotFound from './pages/NotFound'

const mainElement = document.createElement('div')
mainElement.setAttribute('id', 'root')
document.body.appendChild(mainElement)

const Context = React.createContext({
  file: '',
  metadata: {
    title: '',
    artist: '',
    album: '',
    image: ''
  },
  setFile: (arg: string): void => {},
  setMetadata: (arg: FileMetadata): void => {}
})

const App = () => {
  const [file, setFile] = useState<string>('')
  const [metadata, setMetadata] = useState<FileMetadata>({
    title: '',
    artist: '',
    album: '',
    image: ''
  })

  return (
    <Context.Provider value={{
      file,
      metadata,
      setFile,
      setMetadata
    }}>
      <Context.Consumer>
        {context => (
          <>
            <GlobalStyle />
            <Header />
            <BrowserRouter>
              <Switch>
                <Route path="/" exact render={props => (
                  <Home {...props} context={context} />
                )} />
                <Route path="*" component={NotFound} />
              </Switch>
            </BrowserRouter>
          </>
        )}
      </Context.Consumer>
    </Context.Provider>
  )
}

render(<App />, mainElement)
