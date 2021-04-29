import { Link } from 'react-router-dom';

import './regist.modul.scss';

export const RegistPage = () => {
    return (
        <>
            <form className='form'>
                <Link to='/' className='form-back'>
                    Назад
                </Link>

                <h2 className='form-title'>Регистрация</h2>

                <span>Логин:</span>
                <input type='text' className='form-login' placeholder='Ваш логин'></input>

                <span>Пароль:</span>
                <input type='password' className='form-password' placeholder='Ваш пароль'></input>
                <span>Проверка пароля:</span>

                <input
                    type='password'
                    className='form-password'
                    placeholder='Введите поторно пароль'></input>

                <span>Роль:</span>
                <select name='select-enter' className='form-select-enter'>
                    <option>Пользователь</option>
                    <option>Админ</option>
                </select>

                <span>Админ:</span>
                <select name='select-admins' className='form-select-admins'>
                    <option>Админ 1</option>
                    <option>Админ2</option>
                    <option>Админ3</option>
                    <option>Админ4</option>
                </select>

                <Link to='/'>
                    <button type='submit' className='form-btn-submit'>
                        Зарегистрироваться
                    </button>
                </Link>
            </form>

            {/* <Link to='/'>Назад</Link> */}
        </>
    );
};
