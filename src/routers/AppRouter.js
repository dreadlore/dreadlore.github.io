import React from 'react';
import { Router, BrowserRouter, Route, Switch } from 'react-router-dom';
import ContactPage from '../components/ContactPage.js';
import Header from '../components/Header.js';
import FAQPage from '../components/FAQPage.js';
import MainContent from '../components/MainContent.js';
import SiteMap from '../components/SiteMap.js';

class AppRouter extends React.Component {
  render() {
    return (
      <Router 
        hash={this.props.hash}
        history={this.props.history}
      >
        <div>
          <Header />
          <div className="container">
            <div className="row">
              <SiteMap />
              <Switch>
                <Route 
                  component={MainContent}
                  exact={true}
                  path="/"
                  />
                <Route 
                  component={FAQPage}
                  path="/faq"
                  />
                <Route 
                  component={ContactPage}
                  path="/contact"
                  />
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    );
  };
};

export default AppRouter;
