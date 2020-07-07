import styled from 'styled-components'

export const Container = styled.main`
  flex: 1;
  display: flex;
  height: calc(100vh - 32px);
  padding: 0px 8px;
  flex-direction: column;
  align-items: center;
  overflow: auto;
`

export const Header = styled.header`
  display: flex;
  width: 100%;
  height: 40px;
`

export const NavigationButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  background-color: transparent;
  border-radius: 20px;
  border: 0px;
  cursor: pointer;
`

export const Form = styled.form`
  width: 100%;
  max-width: 400px;
  padding: 8px;
`

export const FileSelectionContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 384px;
  height: 384px;
  margin-bottom: 4px;
  border: 2px solid grey;
  border-radius: 4px;
  border-style: dashed;
  cursor: pointer;
`

export const Cover = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 4px;
`

export const InputField = styled.div`
  display: flex;
  flex-direction: column;
  margin: 6px 0px;
`

export const Input = styled.input`
  padding: 14px 10px;
  font-size: 18px;
  border-radius: 4px;
  background-color: #ffffff4d;
  border: 0px;
  color: white;
`

export const Label = styled.label`
  font-size: 18px;
  margin-bottom: 4px;
  color: #ffffffbf;
`

export const FormButton = styled.button`
  width: 100%;
  padding: 16px 8px;
  margin-top: 4px;
  border-radius: 4px;
  background-color: #FFFFFF30;
  border: 0px;
  color: #FFF;
  cursor: pointer;
  font-size: 16px;
`
