import React from "react";
import Hero from "./hero";
import Sidebar from "./sidebar";
import ArticlesFeed from "./articlesFeed";
import Feed from "./feed";
import Pagination from "./pagination";
import fetchData from "../utils/fetchData";

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      openTag: "",
      articles: null,
      activeIndex: 0,
      articlesCount: 0,
      myfeed: false,
      author: null,
      error: "",
    };
  }
  componentDidMount() {
    fetchData(
      this.state.myfeed === true ? `&author=${this.state.author}` : "",
      this.state.activeIndex,
      this.handleArticlesData,
      this.props.user ? this.props.user.token : "",
      this.state.openTag ? `tag=${this.state.openTag}&` : ""
    );
    this.setState({
      author: this.props.author,
    });
  }
  handleArticlesData = (key, value) => {
    this.setState({
      [key]: value,
    });
  };
  handleState = (key, value) => {
    this.setState(
      {
        openTag: "",
        articles: null,
        articlesCount: 0,
        myfeed: false,
        [key]: value,
      },
      () => {
        if (
          (key === "openTag" && value !== "") ||
          key === "activeIndex" ||
          key === "myfeed"
        ) {
          fetchData(
            this.state.myfeed === true ? `&author=${this.state.author}` : "",
            this.state.activeIndex,
            this.handleArticlesData,
            this.props && this.props.user ? this.props.user.token : "",
            this.state.openTag ? `tag=${this.state.openTag}&` : ""
          );
        }
      }
    );
  };
  render() {
    return (
      <div className="main">
        <Hero />
        <div className="flex justify-end">
          <div className="home w-3/5">
            <Feed
              handleState={this.handleState}
              openTag={this.state.openTag}
              author={this.state.author}
              myfeed={this.state.myfeed}
            />
            {this.state.error ? (
              <p className="text-base capitalize text-center m-4">
                {this.state.error}
              </p>
            ) : (
              <>
                <ArticlesFeed
                  articles={this.state.articles}
                  openTag={this.state.openTag}
                  user={this.props.user}
                  handleState={this.handleState}
                />
                {this.state.articles ? (
                  <Pagination
                    handleState={this.handleState}
                    articlesCount={this.state.articlesCount}
                    activeIndex={this.state.activeIndex}
                  />
                ) : (
                  ""
                )}
              </>
            )}
          </div>

          <Sidebar handleState={this.handleState} tags={this.state.tags} />
        </div>
      </div>
    );
  }
}

export default Home;
