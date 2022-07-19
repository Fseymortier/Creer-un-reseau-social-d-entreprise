import React from 'react'
import AuthService from '../services/auth.service'

const Home = () => {
    const currentUser = AuthService.getCurrentUser()
    return (
        <div className="container">
            {currentUser ? (
                <h1>Bonjour {currentUser.nickname}</h1>
            ) : (
                <h1>Bienvenue sur Groupomania</h1>
            )}
        </div>
    )
}
export default Home
