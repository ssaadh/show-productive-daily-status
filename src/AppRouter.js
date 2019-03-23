import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import FrontPage from './components/FrontPage';
import NotFoundPage from './components/NotFoundPage';

const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Switch>
        <Route path="/" component={ FrontPage } />
        <Route component={ NotFoundPage } />
      </Switch>
    </div>
  </BrowserRouter>
);

export default AppRouter;
