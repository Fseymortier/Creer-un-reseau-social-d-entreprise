import React from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import logo from './GroupomaniaLogos/icon-left-font.svg'
import Navbar from './components/Navbar'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Home from './components/Home'
import Profile from './components/Profile'
import AddPost from './components/post/AddPost'
import PostList from './components/post/PostList'
import Post from './components/post/Post'
import Like from './components/post/like'

function App() {
    return (
        <div className="container_app">
            <img className="logo_banner" src={logo} alt="Logo de Groupomania" />
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/signin" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/user/:id" element={<Profile />} />
                <Route path="/posts" element={<PostList />} />
                <Route path="/add" element={<AddPost />} />
                <Route path="/posts/:id" element={<Post />} />
                <Route path="/likes/:id" element={<Like />} />
            </Routes>
            <footer>
                <ul className="ul_footer">
                    <li className="li_footer">Nous Contacter</li>
                    <li className="li_footer">Conditions générales</li>
                    <li className="li_footer">Confidentialité</li>
                </ul>
            </footer>
        </div>
    )
}
export default App
