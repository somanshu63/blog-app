import React from "react";
import { withRouter } from "react-router-dom";

class NewPost extends React.Component {
  constructor() {
    super();
    this.state = {
      title: "",
      description: "",
      body: "",
      tags: "",
      error: "",
    };
  }
  handleInput = ({ target }) => {
    let { name, value } = target;
    this.setState({
      [name]: value,
    });
  };
  checkInput = () => {
    let { title, description, tags, body } = this.state;
    if (!title || !description || !tags || !body) {
      this.setState({
        error: "all fields are required*",
      });
    }
  };
  addArticle = () => {
    let { title, description, tags, body } = this.state;
    fetch(`https://mighty-oasis-08080.herokuapp.com/api/articles`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Token ${this.props.token}`,
      },
      body: JSON.stringify({
        article: {
          title: title,
          description: description,
          body: body,
          tagList: [tags],
        },
      }),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then(({ errors }) => {
            return Promise.reject(errors);
          });
        }
        return res.json();
      })
      .then((article) => {
        this.props.history.push(`/articles/${article.article.slug}`);
      })
      .catch((errors) => {
        this.setState({
          error: errors.error,
        });
      });
  };
  render() {
    let { title, description, tags, body } = this.state;
    let formControlClass =
      "text-lg rounded-md w-full py-1 px-4 my-2 border-2 border-solid border-blue-900 text-blue-900";
    return (
      <div className="bg-creme pb-28">
        <h2 className="capitalize text-2xl text-center p-4 blue ">
          add article
        </h2>
        <div className="text-center mx-auto w-3/5">
          <form
            onSubmit={(event) => {
              event.preventDefault();
              this.checkInput();
              this.addArticle();
            }}
          >
            <span className="text-red-600">
              {this.state.error ? this.state.error : ""}
            </span>
            <input
              placeholder="Enter Article Title"
              onChange={this.handleInput}
              className={formControlClass}
              type="text"
              name="title"
              value={title}
            ></input>
            <input
              placeholder="What's this article is about?"
              onChange={this.handleInput}
              className={formControlClass}
              type="text"
              name="description"
              value={description}
            ></input>
            <textarea
              className={formControlClass}
              placeholder="Write your article"
              rows={6}
              onChange={this.handleInput}
              value={body}
              name="body"
            ></textarea>
            <input
              placeholder="Enter tags"
              onChange={this.handleInput}
              className={formControlClass}
              type="text"
              name="tags"
              value={tags}
            ></input>
            <input
              type="submit"
              value="Add Article"
              className="text-lg rounded-md w-full py-1 px-4 bg-blue-300 blue my-2 border-2 border-solid border-blue-900 text-blue-900"
            ></input>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(NewPost);
