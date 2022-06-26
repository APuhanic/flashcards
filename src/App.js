import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import ErrorPage from './pages/ErrorPage';
import SignUp from './pages/SignUp';
import { Container } from 'react-bootstrap';
import { AuthProvider } from './contexts/authContext';
import PrivateRoute from './components/PrivateRoute';
import Profile from './pages/Profile';
import ForgotPassword from './pages/ForgotPassword';
import DeckList from './components/DeckList';
import Deck from './components/Deck';
import DeckPage from './pages/DeckPage';
import Studying from './pages/Studying';

function App() {

  return (
    <>
      <AuthProvider>
        <Router>
          <Navbar />
          <div className='content'>
            <Routes>
              <Route exact path='/' element={<PrivateRoute />}>
                <Route exact path='/' element={<Profile />} />
              </Route>
              <Route path='/Home' element={<Home />}></Route>
              <Route path='/Profile' element={<Profile />}></Route>
              <Route path='/Home/:id/' element={<DeckPage />}></Route>
              <Route path='/Home/:id/studying' element={<Studying />}></Route>
              <Route path='/DeckList' element={<DeckList />} />
              <Route path='/Deck' element={<Deck />} />
              <Route path='/ForgotPassword' element={<ForgotPassword />}></Route>
              <Route path='/SignUp' element={
                <Container className='d-flex justify-content-center'>
                  <div className='w-100' style={{ maxWidth: "400px", minWidth: "150px" }}>
                    <SignUp />
                  </div>
                </Container>
              }>
              </Route>
              <Route path='/Login' element={
                <Container className='d-flex justify-content-center'>
                  <div className='w-100' style={{ maxWidth: "400px", minWidth: "150px" }}>
                    <Login />
                  </div>
                </Container>
              }>
              </Route>
              <Route path="*" element={<ErrorPage />}></Route>
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
