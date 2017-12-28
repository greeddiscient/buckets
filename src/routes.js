
// src/routes.js
import React from 'react';
import { BrowserRouter, Route,Switch } from 'react-router-dom';

import App from './App';
import AdminLogin from './AdminLogin';
import Admin from './Admin';
import NotFound from './NotFound';

const Routes = (props) => (
  <BrowserRouter>
    <Switch>
        <Route path="/" exact component={App} />
        <Route path="/admin" component={Admin} />
        <Route path="/login" component={AdminLogin} />
        <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
