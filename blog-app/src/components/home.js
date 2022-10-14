import React from "react";
import Hero from "./hero";
import Sidebar from "./sidebar";
import ArticlesFeed from "./articlesFeed";
import Feed from "./feed";
import Pagination from "./pagination";

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      openTag: "",
      articles: null,
      activeIndex: 0,
      articlesCount: 0,
      error: "",
    };
  }
  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    const tag = this.state.openTag ? `tag=${this.state.openTag}&` : "";
    fetch(
      `https://mighty-oasis-08080.herokuapp.com/api/articles?${tag}limit=10&offset=${
        this.state.activeIndex * 10
      }`
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((data) => {
        this.setState({
          articles: data.articles,
          articlesCount: data.articlesCount,
        });
      })
      .catch((err) => {
        this.setState({
          error: "not able to fetch articles",
        });
      });
  };
  handleState = (key, value) => {
    this.setState(
      {
        [key]: value,
      },
      key === "openTag" ? this.fetchData : ""
    );
  };
  render() {
    return (
      <div className="main">
        <Hero />
        <div className="flex justify-end">
          <div className="home w-2/4">
            <Feed handleState={this.handleState} openTag={this.state.openTag} />
            <ArticlesFeed
              articles={this.state.articles}
              openTag={this.state.openTag}
            />
            <Pagination handleState={this.handleState} state={this.state} />
          </div>
          <Sidebar handleState={this.handleState} tags={this.state.tags} />
        </div>
      </div>
    );
  }
}

export default Home;
