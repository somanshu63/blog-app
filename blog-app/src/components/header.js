import React from "react";
import { NavLink } from "react-router-dom";

class Header extends React.Component {
  render() {
    const user = this.props.user;

    return (
      <div className="py-2 px-4 flex justify-between items-center bg-blue">
        <h2 className="text-xl pink">Blog App</h2>
        <nav className="flex items-center">
          <NavLink
            activeClassName="active"
            to={"/"}
            exact
            className="capitalize lightBlue text-base mx-4"
          >
            Home
          </NavLink>
          {user ? (
            <>
              <NavLink
                activeClassName="active"
                to="/new-post"
                className="capitalize lightBlue text-base mx-4"
              >
                New Article
              </NavLink>
              <NavLink
                activeClassName="active"
                to="/settings"
                className="capitalize lightBlue text-base mx-4"
              >
                Settings
              </NavLink>
              <address className="capitalize creme">{user.username}</address>
              <a
                href="/login"
                onClick={() => {
                  localStorage.removeItem("userToken");
                  this.props.handleLogIn(null);
                }}
                className="cursor-pointer capitalize lightBlue text-base mx-4"
              >
                logout
              </a>
            </>
          ) : (
            <>
              {" "}
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
            </>
          )}
        </nav>
      </div>
    );
  }
}

export default Header;
