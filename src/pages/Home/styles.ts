import styled from 'styled-components'

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
margin: 4px;
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
font-size: 20px;
padding: 8px;
`
