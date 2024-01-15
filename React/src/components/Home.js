import React from 'react';
import AuthService from '../services/auth.service';
import '../styles/home.css';

const Home = () => {
    const currentUser = AuthService.getCurrentUser();
    return (
        <div className="container">
            {currentUser ? (
                <h1 className="title">Bonjour {currentUser.nickname}</h1>
            ) : (
                <div>
                    <h1 className="title">Bienvenue sur Groupomania</h1>
                    <p className="txt_accueil">
                        Pour créer un compte vous pouvez entrez une adresse mail fictive.
                        <br />
                        Elle doit simplement respecter les normes d'une adresse mail.
                        <br />
                        (...@gmail.com / ...@outlook.fr / ...@hotmail.fr etc)
                    </p>
                    <p></p>
                </div>
            )}
        </div>
    );
};
export default Home;
