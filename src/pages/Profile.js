import { updateCurrentUser } from 'firebase/auth'
import React, { useState } from 'react'
import { Card, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/authContext'


export default function Profile() {
    const [error, setError] = useState("")
    const { currentUser, logout } = useAuth()
    function handleLogOut() {

    }

    return (
        <>
            <Card>
                <Card.Body>
                    <Card.Text>
                        <h2 className='text-center mb-4'>Profile</h2>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <strong className='text-center mb-1'>Email:</strong> {currentUser.email}
                    </Card.Text>
                    <Button className=" mt-3" type="submit" size="sg">Update profile</Button>
                </Card.Body>
            </Card>
            <div className='w-100 text-center mt-2'>
                <Button variant='link' onClick={handleLogOut}>Log out</Button>
            </div>
        </>
    )
}
