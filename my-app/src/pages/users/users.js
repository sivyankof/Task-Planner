import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import './users.scss';

export const UsersPage = () => {
    const history = useHistory();

    const [usersList, setUsersList] = useState([]);

    useEffect(() => {
        axios
            .get('http://localhost:8080/users', {
                headers: { token: localStorage.getItem('token') },
            })
            .then((res) => {
                if (res.status === 200) {
                    console.log('res ', res);
                    setUsersList(res.data);
                }
            })
            .catch((err) => {
                console.error(err);
                if (err.response.status === 401) {
                    history.push('/login');
                }
            });
    }, []);

    return (
        <>
            <h1>Users</h1>
            {usersList.map((user, index) => (
                <div
                    key={index}
                    className='user-card'
                    onClick={() => history.push(`/tasks/${user._id}`)}>
                    {user.name + ', ' + user.login}
                </div>
            ))}
        </>
    );
};
