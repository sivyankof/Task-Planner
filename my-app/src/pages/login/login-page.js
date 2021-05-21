import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './login.modul.scss';

export const LoginPages = () => {
    const [valueLogin, setValueLogin] = useState('');
    const [valuePass, setValuePass] = useState('');

    const handleClick = () => {
        console.log(valueLogin, valuePass);

        axios
            .post('/user', {
                login: valueLogin,
                password: valuePass,
            })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    return (
        <>
            <form className="form">
                <h2 className="form-title">Вход</h2>

                <span>Логин:</span>
                <input
                    type="text"
                    className="form-login"
                    placeholder="Введите логин"
                    value={valueLogin}
                    onChange={(e) => setValueLogin(e.target.value)}
                ></input>

                <span>Пароль:</span>
                <input
                    type="password"
                    className="form-password"
                    placeholder="Введите пароль"
                    value={valuePass}
                    onChange={(e) => setValuePass(e.target.value)}
                ></input>

                <Link to="/tasks">
                    <button
                        type="submit"
                        className="form-btn-submit"
                        onClick={handleClick}
                    >
                        Войти
                    </button>
                </Link>

                <Link to="/regist" className="form-btn-regist">
                    Зарегистрироваться{' '}
                </Link>
            </form>
        </>
    );
};
