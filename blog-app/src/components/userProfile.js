import React from "react";
import HeroProfile from "./heroProfile";

export default class UserProfile extends React.Component {
  constructor() {
    super();
    this.state = {
      user: "",
    };
  }
  componentDidMount() {
    fetch(
      `https://mighty-oasis-08080.herokuapp.com/api/profiles/${this.props.match.params.username}`
    )
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          user: data.profile,
        });
      });
  }
  render() {
    return <HeroProfile user={this.state.user} follow={true} />;
  }
}
