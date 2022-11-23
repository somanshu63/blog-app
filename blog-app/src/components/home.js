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
          <div className="home w-2/4">
            <Feed
              handleState={this.handleState}
              openTag={this.state.openTag}
              author={this.state.author}
              myfeed={this.state.myfeed}
            />
            <ArticlesFeed
              articles={this.state.articles}
              openTag={this.state.openTag}
            />
            <Pagination
              handleState={this.handleState}
              articlesCount={this.state.articlesCount}
              activeIndex={this.state.activeIndex}
            />
          </div>
          <Sidebar handleState={this.handleState} tags={this.state.tags} />
        </div>
      </div>
    );
  }
}

export default Home;
