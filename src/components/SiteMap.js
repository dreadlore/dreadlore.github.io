import React from 'react';
import { Link } from 'react-router-dom';

class SiteMap extends React.Component {
  render() {
    return (
      <div className="col l3 m12 s12"
          id="site-map"
        >
        <h3>Site Map:</h3>

        <div className="divider">
          </div>

        <div className="section">
            <Link to="/">Home</Link>
        </div>

        <div className="divider">
          </div>
        
        <div className="section">
            <Link to="/faq">FAQ</Link>
        </div>

        <div className="divider">
          </div>

        <div className="section">
            <Link to="/contact">Contact Us!</Link>
        </div>
      </div>
    );
  };
};

export default SiteMap;