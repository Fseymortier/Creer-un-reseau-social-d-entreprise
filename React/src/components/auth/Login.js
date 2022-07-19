import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Form from 'react-validation/build/form'
import Input from 'react-validation/build/input'
import CheckButton from 'react-validation/build/button'
import AuthService from '../../services/auth.service'
import '../../styles/Auth.css'

const required = value => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        )
    }
}
const Login = () => {
    let navigate = useNavigate()
    const form = useRef()
    const checkBtn = useRef()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')

    function onChangeEmail(e) {
        const email = e.target.value
        setEmail(email)
    }
    function onChangePassword(e) {
        const password = e.target.value
        setPassword(password)
    }
    function handleLogin(e) {
        e.preventDefault()
        setMessage('')
        form.current.validateAll()
        if (checkBtn.current.context._errors.length === 0) {
            AuthService.login(email, password).then(
                () => {
                    navigate('/posts')
                    window.location.reload()
                },
                error => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString()
                    setMessage(resMessage)
                }
            )
        }
    }
    return (
        <div className="container_form">
            <Form className="form_login" onSubmit={handleLogin} ref={form}>
                <div className="container_login">
                    <img
                        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                        alt="profile-img"
                        className="profile_img"
                    />
                    <label className="label_login" htmlFor="email">
                        E-mail
                        <Input
                            type="text"
                            className="input_login"
                            name="email"
                            value={email}
                            onChange={onChangeEmail}
                            validations={[required]}
                        />
                    </label>
                    <label className="label_login" htmlFor="password">
                        Mot de passe
                        <Input
                            type="password"
                            className="input_login"
                            name="password"
                            value={password}
                            onChange={onChangePassword}
                            validations={[required]}
                        />
                    </label>
                    <button className="btn_login">
                        <span>Se connecter</span>
                    </button>
                </div>
                {message && (
                    <div className="alert alert-danger" role="alert">
                        {message}
                    </div>
                )}
                <CheckButton style={{ display: 'none' }} ref={checkBtn} />
            </Form>
        </div>
    )
}
export default Login
