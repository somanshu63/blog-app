import React from "react";
import ArticlesFeed from "./articlesFeed";
import Feed from "./feed";
import fetchData from "../utils/fetchData";
import HeroProfile from "./heroProfile";
import { withRouter } from "react-router-dom";
import Loader from "./loader";
let url;

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      articles: null,
      articlesCount: null,
      currentUser: "",
      myfeed: true,
      user: "",
      currentUsername: "",
    };
  }
  componentDidMount() {
    url = `https://mighty-oasis-08080.herokuapp.com/api/profiles/${this.props.match.params.username}`;
    this.fetch(url);
  }
  componentDidUpdate() {
    if (this.props.match.params.username !== this.state.currentUsername) {
      url = `https://mighty-oasis-08080.herokuapp.com/api/profiles/${this.props.match.params.username}`;
      this.fetch(url);
    }
  }
  fetch = (url) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        this.setState(
          {
            currentUsername: this.props.match.params.username,
            currentUser: this.props.user,
            user: data.profile,
          },
          () => {
            fetchData(
              this.state.myfeed
                ? `&author=${this.state.user.username}`
                : `&favorited=${this.state.user.username}`,
              0,
              this.handleState
            );
          }
        );
      });
  };

  handleState = (key, value) => {
    this.setState(
      {
        [key]: value,
      },
      () => {
        if (key === "myfeed") {
          fetchData(
            this.state.myfeed
              ? `&author=${this.state.user.username}`
              : `&favorited=${this.state.user.username}`,
            0,
            this.handleState
          );
        }
      }
    );
  };
  render() {
    return (
      <>
        {this.state.loading ? (
          <Loader />
        ) : (
          <div>
            <HeroProfile
              user={this.state.user}
              follow={
                this.state.user.username !== this.state.currentUser.username
              }
            />
            <div className="w-3/5 mx-auto">
              <Feed
                myfeed={this.state.myfeed}
                author={true}
                myArticles={true}
                favouritedFeed={true}
                handleState={this.handleState}
              />
              <ArticlesFeed
                articles={this.state.articles}
                openTag={this.state.openTag}
              />
            </div>
          </div>
        )}
      </>
    );
  }
}

export default withRouter(Profile);
