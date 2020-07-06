import styled, { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    user-select: none;
    outline-color: transparent;
  }

  body {
    height: 100vh;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 16px;
    color: #E1E1E6;
    -webkit-app-region: no-drag;
  }
`

export const Button = styled.button`
  width: 300px;
  padding: 16px 8px;
  border-radius: 8px;
  background-color: #FFFFFF30;
  border: 0px;
  color: #FFF;
  cursor: pointer;
  font-size: 16px;
`

export const Container = styled.main`
  flex: 1;
  display: flex;
  height: calc(100vh - 32px);
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

export const FileSelectionContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 300px;
  border: 2px solid grey;
  border-radius: 8px;
  border-style: dashed;
  cursor: pointer;
`

export const Cover = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 8px;
`

export const FileName = styled.span`
  font-size: 16px;
  padding: 8px;
`
