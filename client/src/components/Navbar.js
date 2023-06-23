import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/authContext'
import { Alert } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';

export default function Navbar() {
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const { currentUser, logout } = useAuth()

  function LoggedInButton() {
    return (
      <Link to='/Login'>
        <Button variant="outline-primary">Log in</Button>
      </Link>
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
        <Link to="/Home">
          <h1 className="title">Flashcards</h1>
        </Link>
        <div className='links'>
          <LogState></LogState>
        </div>
      </nav>
      {error && <Alert variant="danger">{error}</Alert>}
    </>
  )
}
