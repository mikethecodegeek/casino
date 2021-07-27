import React from 'react'
import { NavLink } from 'react-router-dom';
export default function HomePage() {
    return (
        <div className="container">
            <h1 className="text-center">Welcome to My Google Keeps</h1>
            <>
        <NavLink className="authLink" to="/login">Log In</NavLink>
        <NavLink className="authLink" to="/signup">Sign Up</NavLink>
      </>
        </div>
    )
}
