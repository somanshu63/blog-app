import React from "react";
import { NavLink } from "react-router-dom";
let commentUrl;

export default class Comment extends React.Component {
  constructor(props) {
    super();
    this.state = {
      comment: "",
      error: "",
      comments: [],
    };
  }
  handleInput = ({ target }) => {
    let { name, value } = target;
    this.setState({
      [name]: value,
    });
  };
  checkInput = () => {
    let { comment } = this.state;
    if (!comment) {
      this.setState({
        error: "comment required to add*",
      });
    }
  };
  componentDidMount() {
    commentUrl = `https://mighty-oasis-08080.herokuapp.com/api/articles/${this.props.slug}/comments`;
    this.fetchComments();
  }
  addComment = () => {
    let { comment } = this.state;
    fetch(commentUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Token ${this.props.user.token}`,
      },
      body: JSON.stringify({
        comment: {
          body: comment,
        },
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("cant add new comment");
        }
        return res.json();
      })
      .then((comment) => {
        this.setState(
          {
            comment: "",
          },
          () => {
            this.fetchComments();
          }
        );
      })
      .catch((errors) => {
        this.setState({
          error: errors.error,
        });
      });
  };
  fetchComments = () => {
    fetch(commentUrl)
      .then((res) => {
        if (!res.ok) {
          throw new Error("cant fetch comments");
        }
        return res.json();
      })
      .then((comments) => {
        this.setState({
          comments: comments.comments,
        });
      })
      .catch((errors) => {
        this.setState({
          error: errors.error,
        });
      });
  };
  deleteComment = (id) => {
    fetch(`${commentUrl}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Token ${this.props.user.token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("cant delete comment");
        }
        this.fetchComments();
      })
      .catch((errors) => {
        this.setState({
          error: errors.error,
        });
      });
  };
  render() {
    let { comment, error } = this.state;
    let formControlClass =
      "text-sm rounded-md w-full py-1 px-4 my-2 border-2 border-solid border-blue-900 text-blue-900";

    return (
      <div className=" w-1/3 mx-auto">
        {this.props.user ? (
          <>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                this.checkInput();
                if (!error) {
                  this.addComment();
                }
              }}
            >
              <span className="text-red-500 text-sm">{this.state.error}</span>
              <textarea
                className={formControlClass}
                placeholder="Write comment"
                rows={3}
                onChange={this.handleInput}
                value={comment}
                name="comment"
              ></textarea>
              <input
                type="submit"
                value="Add Comment"
                className={`bg-blue-300 blue ${formControlClass}`}
              ></input>
            </form>
          </>
        ) : (
          <NavLink to={"/login"}>
            <p className="text-base m-4 text-center">
              <span className="text-green-500">SignIn/SignUp</span> to add
              <span className="blue"> Comment</span>
            </p>
          </NavLink>
        )}
        <div>
          <h4 className="blue text-lg m-4 text-center">Comments</h4>
          {this.state.comments.map((comment, i) => {
            return (
              <SingleComment
                deleteComment={this.deleteComment}
                user={this.props.user}
                key={i}
                comment={comment}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

function SingleComment(props) {
  return (
    <div className="my-3 comment flex justify-between items-center">
      <div>
        <p className="blue text-base">{props.comment.body}</p>
        <address className="text-xs capitalize">
          {props.comment.author.username}
        </address>
        <span className="text-xs -mt-4">
          {props.comment.createdAt.slice(0, 10)}
        </span>
      </div>
      {props.user && props.user.username === props.comment.author.username ? (
        <button
          onClick={() => {
            props.deleteComment(props.comment.id);
          }}
          className="text-red-500 text-xs"
        >
          <i className="fa-solid fa-trash"></i>
        </button>
      ) : (
        ""
      )}
    </div>
  );
}
