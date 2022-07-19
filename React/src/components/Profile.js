import React from 'react'
import AuthService from '../services/auth.service'
import '../styles/Profile.css'

const Profile = () => {
    const currentUser = AuthService.getCurrentUser()
    return (
        <div className="container_profile">
            <h1>Profile</h1>
            <div className="container_item_profile">
                <p>
                    <strong>Pseudo:</strong>
                    {currentUser.nickname}
                </p>
                <p>
                    {' '}
                    <strong>Email:</strong> {currentUser.email}{' '}
                </p>
            </div>
        </div>
    )
}
export default Profile
