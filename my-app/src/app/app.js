import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { TaskPage, LoginPages, RegistPage, UsersPage, HomePage } from '../pages/index';

const App = () => {
    return (
        <Router>
            <Route exact path='/'>
                <HomePage />
            </Route>

            <Route path='/login'>
                <LoginPages />
            </Route>

            <Route path='/registration'>
                <RegistPage />
            </Route>

            <Route path='/users'>
                <UsersPage />
            </Route>

            <Route path='/tasks'>
                <TaskPage />
            </Route>
        </Router>
    );
};

export default App;
