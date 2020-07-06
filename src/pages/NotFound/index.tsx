import React from 'react'
import { Link } from 'react-router-dom'
import { Container } from './styles'

const NotFound: React.FC = () => {
  return (
    <Container>
      <strong>Ocorreu um erro</strong>
      <Link to="/">Retornar</Link>
    </Container>
  )
}

export default NotFound
