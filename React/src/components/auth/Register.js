import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';
import { isEmail } from 'validator';
import AuthService from '../../services/auth.service';
import '../../styles/Auth.css';

const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                Ce champ est requis!
            </div>
        );
    }
};
const vnickname = (value) => {
    if (value.length < 6 || value.length > 20) {
        return (
            <div className="alert alert-danger" role="alert">
                Votre pseudo dois contenir un minimum de 6 caractères et maximum 20.
            </div>
        );
    }
};
const validEmail = (value) => {
    if (!isEmail(value)) {
        return (
            <div className="alert alert-danger" role="alert">
                Cette E-mail n'est pas valide.
            </div>
        );
    }
};
const vpassword = (value) => {
    if (value.length < 6 || value.length > 25) {
        return (
            <div className="alert alert-danger" role="alert">
                Votre mot de passe dois contenir un minimum de 6 caractères et maximum 25.
            </div>
        );
    }
};
const Register = () => {
    let navigate = useNavigate();
    const form = useRef();
    const checkBtn = useRef();
    const [nickname, setNickname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    function onChangeNickname(e) {
        const nickname = e.target.value;
        setNickname(nickname);
    }
    function onChangeEmail(e) {
        const email = e.target.value;
        setEmail(email);
    }
    function onChangePassword(e) {
        const password = e.target.value;
        setPassword(password);
    }
    function handleRegister(e) {
        e.preventDefault();
        setMessage('');
        form.current.validateAll();
        if (checkBtn.current.context._errors.length === 0) {
            AuthService.register(nickname, email, password)
                .then((response) => {
                    setMessage(response.message);
                    navigate('/signin');
                })
                .catch((error) => {
                    const resMessage =
                        (error.response && error.response.data && error.response.data.message) ||
                        error.message ||
                        error.toString();
                    setMessage(resMessage);
                });
        }
    }
    return (
        <div className="container_form">
            <Form className="form_signup" onSubmit={handleRegister} ref={form}>
                {/*a modifier pour eviter la creation de d'utilisateur*/}
                <div className="container_signup">
                    <label className="label_signup" htmlFor="nickname">
                        Pseudo
                        <Input
                            type="text"
                            className="input_signup"
                            name="nickname"
                            id="nickname"
                            autoComplete="given-name"
                            placeholder="ex: florian"
                            value={nickname}
                            onChange={onChangeNickname}
                            validations={[required, vnickname]}
                            maxLength={20}
                        />
                    </label>
                    <label className="label_signup" htmlFor="email">
                        E-mail
                        <Input
                            type="text"
                            className="input_signup"
                            name="email"
                            id="email"
                            autoComplete="email"
                            placeholder="ex: florian@gmail.com"
                            value={email}
                            onChange={onChangeEmail}
                            validations={[required, validEmail]}
                        />
                    </label>
                    <label className="label_signup" htmlFor="password">
                        Mot de passe
                        <Input
                            type="password"
                            className="input_signup"
                            name="password"
                            id="password"
                            autoComplete="new-password"
                            value={password}
                            onChange={onChangePassword}
                            validations={[required, vpassword]}
                            maxLength={25}
                        />
                    </label>
                    <button className="btn">S'enregistrer</button>
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
export default Register;
