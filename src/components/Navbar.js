import React from 'react'
import { Button } from 'react-bootstrap'
export default function Navbar() {
  return (
    <nav className='navbar'>
        <h1>Flashcards</h1>
        <div className='links'>
            <a href='/Home'>Home</a>
            <a href='/Profile' className='Profile'>Profile</a>
            <a href='/Login' className='LogInButton'>Log In</a>
        </div>
    </nav>
  )
}
