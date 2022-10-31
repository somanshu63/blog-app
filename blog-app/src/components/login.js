import React from "react";
import { NavLink } from "react-router-dom";
import validate from "../utils/validate";

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: null,
      password: null,
      errors: {
        password: "",
        email: "",
      },
    };
  }
  validateEmail = (email) => {
    const re =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return re.test(email);
  };
  handleInput = ({ target }) => {
    var { name, value } = target;
    let errors = this.state.errors;
    validate(errors, name, value);
    this.setState({
      errors,
      [name]: value,
    });
  };
  checkInput = () => {
    if (!this.state.username || !this.state.password) {
      this.setState({
        errors: {
          email: "required email/password",
        },
      });
    }
  };
  render() {
    let { email, password } = this.state.errors;
    let { Email, Password } = this.state;
    return (
      <div className="login flex-col p-12 flex justify-center items-center">
        <h2 className="text-2xl p-2 blue">Login</h2>
        <div className="flex flex-row">
          <p className="text-red-500 text-lg">Don't have account?</p>
          <NavLink
            to="/signup"
            className={"text-green-500 text-xl underline px-2"}
          >
            Sign up
          </NavLink>
        </div>
        <form
          className="flex flex-col"
          onSubmit={(event) => {
            event.preventDefault();
            this.checkInput();
          }}
        >
          <span className="text-lg text-red-600 py-1">{email}</span>
          <input
            placeholder="Enter Email"
            onChange={this.handleInput}
            className="text-lg rounded-md w-70 py-1 px-4 my-2 border-2 border-solid border-blue-900 text-blue-900"
            type="text"
            name="email"
            value={Email}
          ></input>
          <span className="text-lg text-red-600 py-1">{password}</span>
          <input
            placeholder="Enter Password"
            onChange={this.handleInput}
            type="password"
            name="password"
            value={Password}
            className="text-lg rounded-md w-70 py-1 px-4 my-2 border-2 border-solid border-blue-900 text-blue-900"
          ></input>
          <input
            className="text-lg cursor-pointer rounded-md w-70 py-1 px-4 my-2 border-2 border-solid border-green-900 text-green-900 bg-green-100"
            type="submit"
            value="Login"
            disabled={email || password}
          ></input>
        </form>
      </div>
    );
  }
}
export default Login;
