import React from "react";
import baseurl from "../utils/constants";
import Loading from "./loading";

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: null,
      error: null,
    };
  }
  componentDidMount() {
    fetch(`${baseurl}/api/tags`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((data) => {
        this.setState({
          tags: data.tags,
        });
      })
      .catch((err) => {
        this.setState({
          error: "not able to fetch tags",
        });
      });
  }
  render() {
    const { error } = this.state;
    if (error) {
      return <p className="text-center p-4">{error}</p>;
    }
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
            <div className="mx-auto">
              <Loading />
            </div>
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
      className="text-xs tag  py-1 px-2 m-1 border-solid border rounded-md border-blue-900 blue capitalize"
      href="/"
    >
      {props.tag}
    </a>
  );
}

export default Sidebar;
