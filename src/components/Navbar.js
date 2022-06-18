import React from 'react'
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
export default function Navbar() {
  return (
    <nav className='navbar'>
        <h1>Flashcards</h1>
        <div className='links'>
            <a href='/Home'>Home</a>

            <a href='/Profile' className='Profile'>Profile</a>

            <a href='/Decks' className='Decks'>Decks</a>

            <a href='/Login' className='LogInButton'>Log In</a>


        </div>
    </nav>
  )
}
