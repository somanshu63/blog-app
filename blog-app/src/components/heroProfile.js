import React from "react";
import { NavLink } from "react-router-dom";

export default class HeroProfile extends React.Component {
  state = {
    user: "",
    currentUser: null,
  };
  componentDidMount() {
    this.setState({
      user: this.props.user,
      currentUser: this.props.currentUser,
    });
  }
  followAuthor = () => {
    fetch(
      `https://mighty-oasis-08080.herokuapp.com/api/profiles/${this.state.user.username}/follow`,
      {
        method: this.state.user.following ? "DELETE" : "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Token ${this.state.currentUser.token}`,
        },
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("can't follow author");
        }
        return res.json();
      })
      .then((profile) => {
        this.setState({
          user: profile.profile,
        });
      })
      .catch((errors) => {
        this.setState({
          error: errors.error,
        });
      });
  };
  render() {
    let { username, email, bio, image } = this.props.user;
    return (
      <>
        <div className="bg-creme relative p-4 ">
          <div className="flex items-center flex-col justify-evenly ">
            <div className="flex items-center">
              <img
                className="w-16  rounded-2xl h-16"
                src={image}
                alt={username}
              ></img>
              <h1 className="medBlue text-3xl capitalize p-3">{username}</h1>
            </div>
            <a
              className="  text-xl p-3"
              href="/"
              onClick={(event) => {
                event.preventDefault();
              }}
            >
              {email}
            </a>
            <p className="text-lg">{bio}</p>
          </div>
          {this.props.follow ? (
            <button
              onClick={this.followAuthor}
              className="absolute bottom-2 right-4 p-2 underline pink text-base"
            >
              {this.state.user.following ? "Unfollow" : "Follow"}
            </button>
          ) : (
            <NavLink
              to="/settings"
              className="absolute bottom-2 right-4 p-2 underline pink text-base"
            >
              Update settings
            </NavLink>
          )}
        </div>
      </>
    );
  }
}
