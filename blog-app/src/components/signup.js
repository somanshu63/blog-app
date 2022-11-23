import React from "react";
import { NavLink, withRouter } from "react-router-dom";
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
    if (!this.state.username || !this.state.password || !this.state.email) {
      this.setState({
        errors: {
          email: "required email/password/username",
        },
      });
    }
  };
  signUp = () => {
    fetch(`https://mighty-oasis-08080.herokuapp.com/api/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          username: `${this.state.username}`,
          email: `${this.state.email}`,
          password: `${this.state.password}`,
        },
      }),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then(({ errors }) => {
            return Promise.reject(errors);
          });
        }
        return res.json();
      })
      .then((user) => {
        localStorage.setItem("userToken", JSON.stringify(user.user.token));
        this.props.handleLogIn(user.user);
        this.props.history.push("/");
      })
      .catch((errors) => {
        this.setState({ errors });
      });
  };
  render() {
    let { password, email, username } = this.state.errors;
    let { Password, Email, Username } = this.state;
    return (
      <>
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
              this.signUp();
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
      </>
    );
  }
}
export default withRouter(Signup);
