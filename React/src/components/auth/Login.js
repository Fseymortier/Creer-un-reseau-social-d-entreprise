import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';
import AuthService from '../../services/auth.service';
import { useAuth } from './AuthProvider';
import '../../styles/Auth.css';

const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                Ces champs sont requis
            </div>
        );
    }
};
const Login = () => {
    let navigate = useNavigate();
    const form = useRef();
    const checkBtn = useRef();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const { login } = useAuth();

    function onChangeEmail(e) {
        const email = e.target.value;
        setEmail(email);
    }
    function onChangePassword(e) {
        const password = e.target.value;
        setPassword(password);
    }
    function handleLogin(e) {
        e.preventDefault();
        setMessage('');
        form.current.validateAll();
        if (checkBtn.current.context._errors.length === 0) {
            AuthService.login(email, password).then(
                () => {
                    const user = AuthService.getCurrentUser();
                    login(user.nickname);
                    navigate('/posts');
                },
                (error) => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();
                    setMessage(resMessage);
                }
            );
        }
    }
    return (
        <div className="container_form">
            <Form className="form_login" onSubmit={handleLogin} ref={form}>
                <div className="container_login">
                    <label className="label_login" htmlFor="email">
                        E-mail
                        <Input
                            type="text"
                            className="input_login"
                            name="email"
                            id="email"
                            autoComplete="email"
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
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={onChangePassword}
                            validations={[required]}
                        />
                    </label>
                    <button className="btn">Se connecter</button>
                </div>
                {message && (
                    <div className="alert alert-danger" role="alert">
                        {message}
                    </div>
                )}
                <CheckButton style={{ display: 'none' }} ref={checkBtn} />
            </Form>
        </div>
    );
};
export default Login;
