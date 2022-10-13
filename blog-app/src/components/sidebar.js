import React from "react";
import Loader from "./loader";

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: null,
    };
  }
  componentDidMount() {
    fetch("https://mighty-oasis-08080.herokuapp.com/api/articles")
      .then((res) => res.json())
      .then((data) => {
        let Tags = [];
        const tags = data.articles.map((article) => article.tagList);
        tags.reduce((cv, acc) => {
          Tags.push(...cv);
          return acc;
        }, []);
        Tags.sort((tag) => Math.random() - 0.5);
        this.setState({
          tags: Tags,
        });
      })
      .catch((err) => console.log(err));
  }
  render() {
    return (
      <div className="w-1/4 bg-pink h-full">
        <h2 className="text-center text-xl capitalize blue p-2">sidebar</h2>
        <div className="tags flex flex-wrap p-2">
          {this.state.tags ? (
            this.state.tags.map((tag, i) => {
              return (
                <Tag handleState={this.props.handleState} tag={tag} key={i} />
              );
            })
          ) : (
            <Loader fontSize={"text-lg"} />
          )}
        </div>
      </div>
    );
  }
}

function Tag(props) {
  return (
    <a
      onClick={(event) => {
        event.preventDefault();
        props.handleState("openTag", props.tag);
      }}
      className="text-xs py-1 px-2 m-1 border-solid border rounded-md border-blue-900 blue capitalize"
      href="/"
    >
      {props.tag}
    </a>
  );
}

export default Sidebar;
