import axios from 'axios';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export const HomePage = () => {
    const history = useHistory();

    useEffect(() => {
        axios
            .get('http://localhost:8080/login', {
                headers: { token: localStorage.getItem('token') },
            })
            .then((response) => {
                if (response.status === 200) {
                    const { token, isAdmin } = response.data;
                    localStorage.setItem('token', token);
                    localStorage.setItem('isAdmin', isAdmin);
                    isAdmin ? history.push('/users') : history.push('/tasks');
                }
            })
            .catch((error) => {
                console.log(error.response);
                history.push('/login');
            });
    }, []);

    return <></>;
};
