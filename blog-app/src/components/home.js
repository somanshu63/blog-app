import React from "react";
import Hero from "./hero";
import Sidebar from "./sidebar";
import ArticlesFeed from "./articlesFeed";
import { BrowserRouter } from "react-router-dom";

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      openTag: false,
    };
  }
  handleState = (key, value) => {
    this.setState({
      [key]: value,
    });
  };
  render() {
    return (
      <div className="main">
        <Hero />
        <div className="flex justify-end">
          <div className="home w-2/4">
            <div className="flex justify-start">
              <span
                onClick={() => {
                  this.handleState("openTag", false);
                }}
                className="blue cursor-pointer ml-4 capitalize p-4 border-b-2 border-solid border-blue-900"
              >
                global feed
              </span>
              {this.state.openTag ? (
                <span className="blue cursor-pointer ml-4 capitalize p-4 border-b-2 border-solid border-blue-900">
                  #{this.state.openTag}
                </span>
              ) : (
                ""
              )}
            </div>
            <ArticlesFeed openTag={this.state.openTag} />
          </div>
          <Sidebar handleState={this.handleState} tags={this.state.tags} />
        </div>
      </div>
    );
  }
}

export default Home;
