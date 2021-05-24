import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { TaskPage, LoginPages, RegistPage, UsersPage } from '../pages/index';

const App = () => {
    return (
        <Router>
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
