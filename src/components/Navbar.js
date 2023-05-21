import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/authContext'
import { Alert } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';

export default function Navbar() {
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const { currentUser, logout } = useAuth()

  function LoggedInButton() {
    return (
      <a href='/Login'><Button variant="outline-primary">Log in</Button>
      </a>

    )

  }
  function LoggedOutButton() {
    async function handleLogOut() {
      setError("")
      try {
        await logout()
        navigate("/login")
      } catch {
        setError("Failed to log out")
      }
    }

    return (
      <Button onClick={handleLogOut} variant="outline-primary">Log Out</Button>
    )
  }

  function LogState() {
    if (currentUser) {
      return <LoggedOutButton />
    }
    return <LoggedInButton />
  }

  return (
    <>
      <nav className='navbar'>
        <h1>Flashcards</h1>
        <div className='links'>
          <a href='/Home'>Home</a>
          <a href='/Profile' className='Profile me-2'>Profile</a>
          <LogState></LogState>
        </div>
      </nav>
      {error && <Alert variant="danger">{error}</Alert>}
    </>
  )
}
