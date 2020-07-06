/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react'
import { render } from 'react-dom'
import { GlobalStyle } from './styles/GlobalStyle'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { FileProvider } from './contexts/file'

import Header from './components/Header'
import Home from './pages/Home'
import NotFound from './pages/NotFound'

const mainElement = document.createElement('div')
mainElement.setAttribute('id', 'root')
document.body.appendChild(mainElement)

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Header />
      <FileProvider>
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="*" component={NotFound} />
          </Switch>
        </BrowserRouter>
      </FileProvider>
    </>
  )
}

render(<App />, mainElement)
