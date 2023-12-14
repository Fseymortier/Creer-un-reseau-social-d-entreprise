import React from 'react';
import AuthService from '../services/auth.service';

const Home = () => {
    const currentUser = AuthService.getCurrentUser();
    return (
        <div className="container">
            {currentUser ? (
                <h1 className="title">Bonjour {currentUser.nickname}</h1>
            ) : (
                <h1 className="title">Bienvenue sur Groupomania</h1>
            )}
        </div>
    );
};
export default Home;
