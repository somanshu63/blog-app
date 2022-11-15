import React from "react";
import ArticlesFeed from "./articlesFeed";
import Feed from "./feed";
import fetchData from "../utils/fetchData";
import HeroProfile from "./heroProfile";

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      articles: null,
      articlesCount: null,
      author: "",
      myfeed: true,
    };
  }
  componentDidMount() {
    fetchData(
      this.state.myfeed
        ? `&author=${this.props.user.username}`
        : `&favorited=${this.props.user.username}`,
      0,
      this.handleState
    );
  }

  handleState = (key, value) => {
    this.setState(
      {
        [key]: value,
      },
      () => {
        if (key === "myfeed") {
          fetchData(
            this.state.myfeed
              ? `&author=${this.props.user.username}`
              : `&favorited=${this.props.user.username}`,
            0,
            this.handleState
          );
        }
      }
    );
  };
  render() {
    return (
      <div>
        <HeroProfile user={this.props.user} />
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
    );
  }
}

export default Profile;
