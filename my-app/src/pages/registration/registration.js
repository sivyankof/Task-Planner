import { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

import './regist.modul.scss';

export const RegistPage = () => {
    const history = useHistory();

    const [selected, setSelected] = useState(false);
    const [isPasswordError, setIsPasswordError] = useState(false);
    const [isFormValid, setIsFormValid] = useState(true);
    const [nameLoginExists, setNameLoginExists] = useState(false);
    const [adminList, setAdminList] = useState([]);
    const [registrationForm, setRegistrationForm] = useState({
        name: '',
        login: '',
        password: '',
        role: '',
        adminId: '',
    });
    const [checkPasswordValue, setCheckPasswordValue] = useState('');

    useEffect(() => {
        axios
            .get('http://localhost:8080/admins')
            .then((res) => {
                if (res.status === 200) {
                    setAdminList(res.data);
                    if (!res.data.length) {
                        changeFormValue('admin', 'role');
                    }
                }
            })
            .catch((err) => {
                console.error(err);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const changeFormValue = (value, fieldName) => {
        const registrationFormCopy = { ...registrationForm };
        registrationFormCopy[fieldName] = value;
        if (fieldName === 'name') {
            setNameLoginExists(false);
        }
        if (fieldName === 'role') {
            if (value === 'admin') {
                setSelected(false);
                registrationFormCopy['adminId'] = '';
            } else {
                setSelected(true);
            }
        }
        setRegistrationForm(registrationFormCopy);
    };

    const checkPasswordsMatch = (value) => {
        setCheckPasswordValue(value);
    };

    const checkFormValid = () => {
        if (isPasswordError || nameLoginExists) {
            setIsFormValid(false);
            return false;
        }
        const registrationFormValues = Object.values(registrationForm);
        if (registrationForm.role === 'admin') {
            registrationFormValues.pop();
        }
        const validValues = registrationFormValues.every((value) => value !== '');
        setIsFormValid(validValues);
        return validValues;
    };

    const registrateUser = (event) => {
        event.preventDefault();
        if (checkFormValid()) {
            registrateRequest(
                `http://localhost:8080/registration/${registrationForm.role}`,
            );
        }
    };

    const registrateRequest = (url) => {
        const registrationFormCopy = { ...registrationForm };
        if (registrationForm.role === 'admin') {
            delete registrationFormCopy.adminId;
        }
        delete registrationFormCopy.role;
        axios
            .post(url, registrationFormCopy)
            .then((res) => {
                if (res.status === 201) {
                    history.push('/login');
                }
            })
            .catch((err) => {
                console.error(err);
                if (err.response.status === 409) {
                    setNameLoginExists(true);
                }
            });
    };

    return (
        <>
            <form className='form' onSubmit={registrateUser}>
                <Link to='/login' className='form-back'>
                    Назад
                </Link>

                <h2 className='form-title'>Регистрация</h2>

                {nameLoginExists && (
                    <span style={{ color: 'red' }}>
                        Пользователь с таким именем или логином уже существует
                    </span>
                )}
                <span>Ваше имя:</span>
                <input
                    type='text'
                    className='form-name'
                    value={registrationForm.name}
                    onChange={(event) => changeFormValue(event.target.value, 'name')}
                    placeholder='Ваше имя'></input>

                <span>Логин:</span>
                <input
                    type='text'
                    className='form-login'
                    value={registrationForm.login}
                    onChange={(event) => changeFormValue(event.target.value, 'login')}
                    placeholder='Ваш логин'></input>

                <span>Пароль:</span>
                <input
                    type='password'
                    className='form-password'
                    value={registrationForm.password}
                    onChange={(event) => changeFormValue(event.target.value, 'password')}
                    placeholder='Ваш пароль'></input>

                <span>Проверка пароля:</span>
                <input
                    type='password'
                    className='form-password'
                    disabled={!registrationForm.password}
                    value={checkPasswordValue}
                    onChange={(event) => checkPasswordsMatch(event.target.value)}
                    onBlur={() =>
                        setIsPasswordError(
                            checkPasswordValue !== registrationForm.password,
                        )
                    }
                    placeholder='Введите поторно пароль'></input>
                {isPasswordError && (
                    <span style={{ color: 'red' }}>Пароли не совпадают</span>
                )}

                <span>Роль:</span>
                <select
                    name='select-enter'
                    className='form-select-enter'
                    onChange={(event) => changeFormValue(event.target.value, 'role')}>
                    <option>Выберите роль</option>
                    {adminList.length && <option value='user'>Пользователь</option>}
                    <option value='admin'>Админ</option>
                </select>

                {selected && Boolean(adminList.length) && (
                    <>
                        <span>Админ:</span>

                        <select
                            name='select-admins'
                            className='form-select-admins'
                            onChange={(event) =>
                                changeFormValue(event.target.value, 'adminId')
                            }>
                            <option>Выберите админа</option>
                            {adminList.map((admin, i) => (
                                <option key={i} value={admin._id}>
                                    {admin.name + ', ' + admin.login}
                                </option>
                            ))}
                        </select>
                    </>
                )}

                {!isFormValid && (
                    <span style={{ color: 'red' }}>Не все поля введены правильно</span>
                )}

                <button type='submit' className='form-btn-submit'>
                    Зарегистрироваться
                </button>
            </form>
        </>
    );
};
