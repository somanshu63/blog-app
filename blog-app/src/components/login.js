import React from "react";
import { NavLink, Redirect } from "react-router-dom";
import validate from "../utils/validate";

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: null,
      password: null,
      loggedIn: false,
      loading: false,
      errors: {
        password: "",
        email: "",
      },
    };
  }

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
    if (!this.state.email || !this.state.password) {
      this.setState({
        errors: {
          email: "required email/password",
        },
      });
    }
  };
  login = () => {
    fetch(`https://mighty-oasis-08080.herokuapp.com/api/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          email: `${this.state.email}`,
          password: `${this.state.password}`,
        },
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((user) => {
        if (user && user.errors) {
          this.setState({
            errors: {
              email: `${user.errors["email or password"]}`,
            },
          });
        } else if (user && user.user) {
          this.setState({
            loggedIn: true,
          });
          localStorage.setItem("user", JSON.stringify(user.user));
          this.props.handleLogIn(user.user);
        }
      })
      .catch((err) => {
        this.setState({
          errors: {
            email: "not able to login",
          },
        });
      });
  };
  render() {
    let { email, password } = this.state.errors;
    let { Email, Password } = this.state;
    return (
      <>
        {this.state.loggedIn ? <Redirect to="/" /> : ""}
        {this.state.loading ? (
          <div className="flex justify-center">
            <div className=" loader m-12"></div>
          </div>
        ) : (
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
                this.setState({
                  loading: true,
                });
                this.login();
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
        )}
      </>
    );
  }
}
export default Login;
