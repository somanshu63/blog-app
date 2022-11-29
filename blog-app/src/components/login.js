import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import baseurl from "../utils/constants";
import validate from "../utils/validate";

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: null,
      password: null,
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
    fetch(`${baseurl}/api/users/login`, {
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
          this.setState({
            loading: false,
          });
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
        console.log(errors);
        this.setState({
          errors: {
            email: "invalid",
          },
        });
      });
  };
  render() {
    let { email, password } = this.state.errors;
    let { Email, Password } = this.state;
    return (
      <>
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
              <span className="text-xs text-red-600 py-1">{email}</span>
              <input
                placeholder="Enter Email"
                onChange={this.handleInput}
                className="text-lg rounded-md w-70 py-1 px-4 my-2 border-2 border-solid border-blue-900 text-blue-900"
                type="text"
                name="email"
                value={Email}
              ></input>
              <span className="text-xs text-red-600 py-1">{password}</span>
              <input
                placeholder="Enter Password"
                onChange={this.handleInput}
                type="password"
                name="password"
                value={Password}
                className="text-lg rounded-md w-70 py-1 px-4 my-2 border-2 border-solid border-blue-900 text-blue-900"
              ></input>
              <input
                className={`text-lg cursor-pointer rounded-md w-70 py-1 px-4 my-2 border-2 border-solid ${
                  !this.state.email || !this.state.password
                    ? "border-red-500 text-red-500 bg-red-300"
                    : "border-green-700 text-green-700 bg-green-200"
                }`}
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
export default withRouter(Login);
