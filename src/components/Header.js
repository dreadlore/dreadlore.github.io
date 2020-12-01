import React from 'react';

class Header extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="row"
            id="top-page"
          >
          <div className="col l8 m12">
            <h1>DreadLore 2.0</h1>
            <h4>
                You don't have to roll to <italic>win.</italic>
            </h4>
          </div>
          <div className="col l3 offset-l1 m12">
            <img 
              alt="dreadlore-logo"
              className="logo-image"
              src="/media/dreadlore_tshirt_transparent.png"
              />
          </div>
        </div>
      </div>
    );
  };
};

export default Header;