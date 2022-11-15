import React from "react";
import validate from "../utils/validate";

class Settings extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      imageURL: "",
      email: "",
      bio: "",
      password: "",
      error: "",
    };
  }
  componentDidMount() {
    let { image, username, bio, email } = this.props.user;
    this.setState({
      username: username,
      email: email,
      bio: bio,
      imageURL: image,
    });
  }
  handleInput = ({ target }) => {
    let error = this.state.error;
    let { name, value } = target;
    if (name === "email") {
      validate(error, name, value);
    }
    this.setState({
      [name]: value,
    });
  };
  updateDetails = () => {
    let { imageURL, username, bio, password, email } = this.state;
    fetch(`https://mighty-oasis-08080.herokuapp.com/api/user`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Token ${this.props.token}`,
      },
      body: JSON.stringify({
        user: {
          image: imageURL,
          username: username,
          bio: bio,
          password: password,
          email: email,
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
        console.log(user);
        this.props.updateUser(user.user);
      })
      .catch((errors) => {
        this.setState({
          error: errors.error,
        });
      });
  };
  render() {
    let formControlClass =
      "text-lg rounded-md w-full py-1 px-4 my-2 border-2 border-solid border-blue-900 text-blue-900";
    let { imageURL, username, bio, password, email } = this.state;
    return (
      <div className="bg-creme pb-32">
        <h2 className="capitalize text-2xl text-center p-4 blue ">
          add article
        </h2>
        <div className="text-center mx-auto w-2/5">
          <form
            onSubmit={(event) => {
              event.preventDefault();
              validate(this.state.error, email, this.state.email);
              if (this.state.error) {
                return this.setState({ error: "check email" });
              }
              this.updateDetails();
            }}
          >
            <input
              placeholder="Enter profile picture URL"
              onChange={this.handleInput}
              className={formControlClass}
              type="text"
              name="imageURL"
              value={imageURL}
            ></input>
            <input
              placeholder="Enter username"
              onChange={this.handleInput}
              className={formControlClass}
              type="text"
              name="username"
              value={username}
            ></input>
            <input
              placeholder="Enter email"
              onChange={this.handleInput}
              className={formControlClass}
              type="email"
              name="email"
              value={email}
            ></input>
            <textarea
              placeholder="Enter bio"
              onChange={this.handleInput}
              className={formControlClass}
              name="bio"
              value={bio}
              rows={3}
            ></textarea>
            <input
              placeholder="Enter new password"
              onChange={this.handleInput}
              className={formControlClass}
              type="password"
              name="password"
              value={password}
            ></input>
            <input
              type="submit"
              value="Update Details"
              className="text-lg rounded-md w-full py-1 px-4 bg-blue-300 blue my-2 border-2 border-solid border-blue-900 text-blue-900"
            ></input>
          </form>
        </div>
      </div>
    );
  }
}

export default Settings;
