import React, { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList';
import { v4 as uuidv4 } from 'uuid'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import TodoPage from './pages/TodoPage';
import ErrorPage from './pages/ErrorPage';
import Footbar from './components/Footbar';
import SignUp from './pages/SignUp';
import { Container } from 'react-bootstrap';
import { AuthProvider } from './contexts/authContext';
import PrivateRoute from './components/PrivateRoute';

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {

  return (
    <>
      <AuthProvider>

        <Router>
          <Navbar />
          <div className='content'>
            <Routes>
              
                <Route exact path='/' element={<Home />} />
              
              <Route path='/Login' element={
                <Container className='d-flex justify-content-center'
                >
                  <div className='w-100' style={{ maxWidth: "400px", minWidth: "150px" }}>
                    <Login />
                  </div>
                </Container>
              }>
              </Route>
              <Route path='/TodoPage' element={<TodoPage />}></Route>
              <Route path='/Home' element={<Home />}></Route>
              <Route path='/SignUp' element={
                <Container className='d-flex justify-content-center'
                >
                  <div className='w-100' style={{ maxWidth: "400px", minWidth: "150px" }}>
                    <SignUp />
                  </div>
                </Container>
              }>
              </Route>
              <Route path="*" element={<ErrorPage />}></Route>
            </Routes>
          </div>
          <Footbar />
        </Router>
      </AuthProvider>

    </>
  );
}

export default App;
