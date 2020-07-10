import styled, { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    user-select: none;
    outline: 0;
    outline-color: transparent;
  }

  body {
    height: 100vh;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 16px;
    color: #E1E1E6;
    -webkit-app-region: no-drag;
  }

  /* width */
  ::-webkit-scrollbar {
    width: 8px;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #FFFFFF30;
  }
`

export const Button = styled.button`
  width: 300px;
  padding: 16px 8px;
  margin: 2px;
  border-radius: 4px;
  background-color: #FFFFFF30;
  border: 0px;
  color: #FFF;
  cursor: pointer;
  font-size: 16px;
`
