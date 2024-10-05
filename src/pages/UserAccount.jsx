import React from 'react'
import { Outlet } from 'react-router-dom'
import { Container } from '../components'

function UserAccount() {
  return (
    <Container>
      <Outlet />
    </Container>
  )
}

export default UserAccount