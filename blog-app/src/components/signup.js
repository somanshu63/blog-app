import React from "react";
import { NavLink } from "react-router-dom";
import validate from "../utils/validate";

class Signup extends React.Component {
  constructor() {
    super();
    this.state = {
      username: null,
      email: null,
      password: null,
      errors: {
        username: null,
        email: null,
        password: null,
      },
    };
  }
  validateEmail = (email) => {
    const re =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return re.test(email);
  };
  handleInput = ({ target }) => {
    let { name, value } = target;
    let errors = this.state.errors;
    validate(errors, name, value);
    this.setState({
      errors,
      [name]: value,
    });
  };
  checkInput = () => {
    if (!this.state.username || !this.state.password || this.state.username) {
      this.setState({
        errors: {
          email: "required email/password/username",
        },
      });
    }
  };
  render() {
    let { password, email, username } = this.state.errors;
    let { Password, Email, Username } = this.state;
    return (
      <div className="login flex-col p-12 flex justify-center items-center">
        <h2 className="text-2xl p-2 blue">Sign up</h2>
        <div className="flex flex-row">
          <p className="text-green-500 text-lg">Already have an account?</p>
          <NavLink
            to="/login"
            className={"text-blue-900 text-xl underline px-2"}
          >
            Login
          </NavLink>
        </div>
        <form
          className="flex flex-col"
          onSubmit={(event) => {
            event.preventDefault();
            this.checkInput();
          }}
        >
          <span className="text-lg text-red-500">{email}</span>
          <input
            placeholder="Enter Email"
            onChange={this.handleInput}
            className="text-xl rounded-md w-70 py-1 px-4 my-2 border-2 border-solid border-blue-900 text-blue-900"
            type="text"
            name="email"
            value={Email}
          ></input>
          <span className="text-lg text-red-500">{password}</span>
          <input
            placeholder="Enter Password"
            onChange={this.handleInput}
            type="password"
            name="password"
            value={Password}
            className="text-lg rounded-md w-70 py-1 px-4 my-2 border-2 border-solid border-blue-900 text-blue-900"
          ></input>
          <span className="text-lg text-red-500">{username}</span>
          <input
            placeholder="Enter Username"
            onChange={this.handleInput}
            className="text-lg rounded-md w-70 py-1 px-4 my-2 border-2 border-solid border-blue-900 text-blue-900"
            type="text"
            name="username"
            value={Username}
          ></input>
          <input
            className="text-lg cursor-pointer rounded-md w-70 py-1 px-4 my-2 border-2 border-solid border-blue-900 text-blue-900 bg-blue-100"
            type="submit"
            value="Sign up"
            disabled={email || password || username}
          ></input>
        </form>
      </div>
    );
  }
}
export default Signup;
