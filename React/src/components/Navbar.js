import React from "react";
import { Link } from "react-router-dom";
import AuthService from "../services/auth.service";
import "../styles/NavBar.css";

const currentUser = AuthService.getCurrentUser();

const Navbar = () => {
    return currentUser ? (
        <nav className="nav_bar_connected flex">
            <Link to="/" className="nav-link" onClick={AuthService.logout}>
                Se déconnecter
            </Link>
            <Link to={"/user/" + currentUser.id} className="nav-link">
                Utilisateur
            </Link>
            <Link to="/posts" className="nav-link">
                Accueil
            </Link>
            <Link to={"/add"} className="nav-link">
                Ajouter un Post
            </Link>
        </nav>
    ) : (
        <nav className="nav_bar_notConnected flex">
            <Link to={"/signin"} className="nav-link">
                Se connecter
            </Link>
            <Link to={"/register"} className="nav-link">
                S'enregistrer
            </Link>
        </nav>
    );
};

export default Navbar;
