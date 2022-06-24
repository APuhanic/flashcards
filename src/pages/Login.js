import React, { useRef, useState } from 'react';
import { useAuth } from '../contexts/authContext';
import { Button, Form, Card, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import { getDatabase } from "firebase/database";
import { setDoc, doc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

export default function Login() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const db = getDatabase();
  const { currentUser } = useAuth();
  const auth = getAuth();

  async function createUser() {
    try {
      setDoc(doc(db, "users", auth.currentUser.uid), {
        email: currentUser.email
      })
    }
    catch (error) {
      console.log(error)
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      setError("")
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
      createUser()
      navigate("/Profile")

    } catch (error) {
      setError('Failed to log in.')
      console.log(error)
    }
    setLoading(false)
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className='text-center mb-4'>Log In</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>

            <Button disabled={loading} className="w-100 mt-3" type="submit">Log In</Button>
            <div className="w-100 text-center mt-3">
              <Link to="/ForgotPassword">Forgot Password? </Link>
            </div>

          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Need an account?
        <Link to='/SignUp' className=''> Sign up</Link>
      </div>
    </>
  )
}
