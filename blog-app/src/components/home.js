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
      myfeed: false,
      author: null,
      error: "",
    };
  }
  componentDidMount() {
    this.fetchData();
    this.setState({
      author: this.props.author,
    });
  }
  fetchData = () => {
    const tag = this.state.openTag ? `tag=${this.state.openTag}&` : "";
    let authorFilter;
    if (this.state.myfeed === true) {
      authorFilter = `&author=${this.state.author}`;
    }

    fetch(
      `https://mighty-oasis-08080.herokuapp.com/api/articles?${tag}limit=10&offset=${
        this.state.activeIndex * 10
      }${authorFilter ? authorFilter : ""}`
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
          this.fetchData();
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
