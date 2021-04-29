import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { TaskPage, LoginPages, RegistPage, UsersPage } from '../pages/index';

const App = () => {
    return (
        <Router>
            <Route exact path='/'>
                <LoginPages />
            </Route>

            <Route path='/tasks'>
                <TaskPage />
            </Route>

            <Route path='/regist'>
                <RegistPage />
            </Route>

            <Route path='/users'>
                <UsersPage />
            </Route>
        </Router>
    );
};

export default App;
