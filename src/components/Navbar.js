import React from 'react'
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
export default function Navbar() {
  return (
    <nav className='navbar'>
        <h1>Flashcards</h1>
        <div className='links'>
            <a href='/'>Home</a>

            <a href='/TodoPage' className='TodoPage'>TodoPage</a>

            <a href='/Login' className='LogInButton'>Log In</a>



        </div>
    </nav>
  )
}
