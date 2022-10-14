import React from "react";
import { NavLink } from "react-router-dom";

class Header extends React.Component {
  render() {
    return (
      <div className="py-2 px-4 flex justify-between items-center bg-blue">
        <h2 className="text-xl pink">Blog App</h2>
        <nav className="flex">
          <NavLink
            activeClassName="active"
            to={"/"}
            exact
            className="capitalize lightBlue text-base mx-4"
          >
            Home
          </NavLink>
          <NavLink
            activeClassName="active"
            to="/login"
            className="capitalize lightBlue text-base mx-4"
          >
            login
          </NavLink>
          <NavLink
            activeClassName="active"
            to={"/signup"}
            className="capitalize lightBlue text-base mx-4"
          >
            signup
          </NavLink>
        </nav>
      </div>
    );
  }
}

export default Header;
