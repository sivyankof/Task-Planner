import { Link } from "react-router-dom";

import "./login.modul.scss";

export const LoginPages = () => {
    return (
        <>
            <form className="form">
                <h2 className="form-title">Вход</h2>

                <span>Логин:</span>
                <input
                    type="text"
                    className="form-login"
                    placeholder="Введите логин"
                ></input>

                <span>Пароль:</span>
                <input
                    type="password"
                    className="form-password"
                    placeholder="Введите пароль"
                ></input>

                <Link to="/tasks">
                    <button type="submit" className="form-btn-submit">
                        Войти
                    </button>
                </Link>

                <Link to="/regist" className="form-btn-regist">
                    Зарегистрироваться{" "}
                </Link>
            </form>
        </>
    );
};
