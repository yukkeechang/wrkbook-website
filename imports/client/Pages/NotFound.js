import React from "react";
import Header from "./Shared/Header";
//FLAG should be a stateless component and other things
export default (NotFound = () => {
  return (
    <div>
      <Header />
      <div className="header-nav-bar-offset" />
      <div className="container">
        <div className="row">
          <div className="col s12 center-align">
            <h3 className="to-bold">404 Not Found</h3>
          </div>
        </div>
      </div>
    </div>
  );
});
