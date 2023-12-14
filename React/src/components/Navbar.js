import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../services/auth.service';
import { useAuth } from './auth/AuthProvider';
import '../styles/NavBar.css';
import icoMenu from '../styles/icone/menu.svg';

const Navbar = () => {
    const currentUser = AuthService.getCurrentUser();
    const { logout } = useAuth();
    function deconnexion() {
        AuthService.logout();
        logout();
    }
    const [menu, setMenu] = useState(false);
    function afficherMenu() {
        setMenu(!menu);
    }
    useEffect(() => {
        const handleResise = () => {
            if (window.innerWidth >= 480) {
                setMenu(true);
            } else {
                setMenu(false);
            }
        };
        handleResise();
        window.addEventListener('resize', handleResise);
        return () => {
            window.removeEventListener('resize', handleResise);
        };
    }, []);

    return (
        <nav>
            <Link className="mobileMenu flex" onClick={afficherMenu}>
                <img
                    src={icoMenu}
                    className="mobileMenu_img"
                    alt="icone menu mobile"
                />
            </Link>
            {currentUser ? (
                <div
                    className="nav_bar_connected flex"
                    style={{ display: menu ? 'flex' : 'none' }}
                >
                    <Link to="/" className="nav-link" onClick={deconnexion}>
                        Se déconnecter
                    </Link>

                    <Link to={'/user/' + currentUser.id} className="nav-link">
                        Utilisateur
                    </Link>

                    <Link to="/posts" className="nav-link">
                        Accueil
                    </Link>

                    <Link to={'/add'} className="nav-link">
                        Ajouter un Post
                    </Link>
                </div>
            ) : (
                <div
                    className="nav_bar_notConnected flex"
                    style={{ display: menu ? 'flex' : 'none' }}
                >
                    <Link to={'/signin'} className="nav-link">
                        Se connecter
                    </Link>

                    <Link to={'/register'} className="nav-link">
                        S'enregistrer
                    </Link>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
