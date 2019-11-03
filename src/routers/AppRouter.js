import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HomePage from '../components/HomePage.js';

class AppRouter extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route 
              component={HomePage}
              exact={true}
              path="/"
            />

          </Switch>
        </div>
      </BrowserRouter>
    );
  };
};

export default AppRouter;
