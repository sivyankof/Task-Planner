import { useState } from "react";
import { Link } from "react-router-dom";

import "./regist.modul.scss";

export const RegistPage = () => {
    const [selected, setSelected] = useState(true);

    const onChangeSelect = (e) => {
        e.target.value === "Админ" ? setSelected(false) : setSelected(true);
    };

    return (
        <>
            <form className="form">
                <Link to="/" className="form-back">
                    Назад
                </Link>

                <h2 className="form-title">Регистрация</h2>

                <span>Логин:</span>
                <input
                    type="text"
                    className="form-login"
                    placeholder="Ваш логин"
                ></input>

                <span>Пароль:</span>
                <input
                    type="password"
                    className="form-password"
                    placeholder="Ваш пароль"
                ></input>
                <span>Проверка пароля:</span>

                <input
                    type="password"
                    className="form-password"
                    placeholder="Введите поторно пароль"
                ></input>

                <span>Роль:</span>
                <select
                    name="select-enter"
                    className="form-select-enter"
                    onChange={(e) => onChangeSelect(e)}
                >
                    <option value="Пользователь">Пользователь</option>
                    <option value="Админ">Админ</option>
                </select>

                <span>Админ:</span>

                {selected && (
                    <select name="select-admins" className="form-select-admins">
                        <option>Админ 1</option>
                        <option>Админ 2</option>
                        <option>Админ 3</option>
                        <option>Админ 4</option>
                    </select>
                )}

                <Link to="/">
                    <button type="submit" className="form-btn-submit">
                        Зарегистрироваться
                    </button>
                </Link>
            </form>
        </>
    );
};
