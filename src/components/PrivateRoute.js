import React from "react"
import { Route, useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/authContext"

export default function PrivateRoute({ component: Component, ...rest }) {
    const { currentUser } = useAuth()
    const Navigate = useNavigate();

    return (
        <Route
            {...rest}
            render={props => {
                return currentUser ? <Component {...props}a /> : <Navigate to="/login" />
            }}
        ></Route>
    )
}