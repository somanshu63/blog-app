import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import Comment from "./comment";
import Hero from "./hero";
import Loader from "./loader";

class Article extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      article: null,
      error: null,
      profile: null,
    };
  }
  componentDidMount() {
    this.fetchData();
  }
  fetchData = () => {
    const slug = this.props.match.params.slug;
    fetch(`https://mighty-oasis-08080.herokuapp.com/api/articles/${slug}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((article) => {
        this.setState(
          {
            article: article,
          },
          () => {
            fetch(
              `https://mighty-oasis-08080.herokuapp.com/api/profiles/${this.state.article.article.author.username}`
            )
              .then((res) => {
                if (!res.ok) {
                  throw new Error(res.statusText);
                }
                return res.json();
              })
              .then((profile) => {
                this.setState({
                  profile: profile.profile,
                });
              })
              .catch((err) => {
                this.setState({
                  error: "not able to fetch profile",
                });
              });
          }
        );
      })
      .catch((err) => {
        this.setState({
          error: "not able to fetch article",
        });
      });
  };
  deleteArticle = () => {
    fetch(
      `https://mighty-oasis-08080.herokuapp.com/api/articles/${this.state.article.article.slug}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: `Token ${this.props.user.token}`,
        },
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("can't delete article");
        }
        this.props.history.push(`/`);
      })
      .catch((errors) => {
        this.setState({
          error: errors.error,
        });
      });
  };
  followAuthor = () => {
    fetch(
      `https://mighty-oasis-08080.herokuapp.com/api/profiles/${this.state.profile.username}/follow`,
      {
        method: this.state.profile.following ? "DELETE" : "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Token ${this.props.user.token}`,
        },
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("can't follow author");
        }
        return res.json();
      })
      .then((profile) => {
        this.setState({
          profile: profile.profile,
        });
      })
      .catch((errors) => {
        this.setState({
          error: errors.error,
        });
      });
  };
  render() {
    let article, author;
    if (this.state.article) {
      article = this.state.article.article;
      author = (
        <div className="">
          <div className="flex items-center">
            <img
              className="h-12 w-12 mx-4 inline-block rounded-full"
              src={article.author.image}
              alt={article.author.username}
            ></img>
            <address className="text text-xl blue capitalize">
              {article.author.username}
            </address>
          </div>
          {this.props.user &&
          this.props.user.username ===
            this.state.article.article.author.username ? (
            <div className="flex mt-4">
              <button
                onClick={() => {
                  this.props.history.push({
                    pathname: "/edit-article",
                    state: {
                      article: this.state.article.article,
                    },
                  });
                }}
                className="text-sm blue border-2 border-blue-900 mx-2 py-1 px-2 rounded-md"
              >
                <i className="mr-1 fa-solid fa-pen-to-square"></i>Edit Article
              </button>
              <button
                onClick={this.deleteArticle}
                className="text-sm text-red-600 border-2 border-red-600 mx-2 py-1 px-2 rounded-md"
              >
                <i className="mr-1 fa-solid fa-trash"></i>Delete Article
              </button>
            </div>
          ) : (
            ""
          )}
          <div className="items-center">
            {this.props.user ? (
              this.props.user.username !==
              this.state.article.article.author.username ? (
                <button
                  onClick={this.followAuthor}
                  className={`text-sm border-2 mx-2 mt-4 py-1 px-2 rounded-md ${
                    this.state.profile && this.state.profile.following
                      ? "text-red-600 border-red-600"
                      : "text-green-600 border-green-600"
                  }`}
                >
                  {this.state.profile && !this.state.profile.following
                    ? "Follow Author"
                    : "Unfollow Author"}
                </button>
              ) : (
                ""
              )
            ) : (
              <NavLink to={"/login"}>
                <p className="text-base m-4 text-center">
                  <span className="text-green-500">SignIn/SignUp</span> to
                  follow
                  <span className="blue"> Author</span>
                </p>
              </NavLink>
            )}
          </div>
        </div>
      );
    }

    return (
      <div>
        {this.state.article ? (
          <>
            <Hero title={article.title} description={author} />
            <div className="mx-8 my-4">
              <p className="text-lg py-4">{article.description}</p>
              <p className="text-lg py-4">{article.body}</p>
              <p className="text-base py-4">
                {article.tagList.length > 0 ? `Tags: ${article.tagList}` : ""}
              </p>
              <div>
                <a
                  href="/"
                  className="rounded-lg my-4 inline-block border-solid border-2 border-green-600 py-1 px-2"
                >
                  💚{" "}
                  <span className="text-sm text-green-600">
                    {article.favoritesCount}
                  </span>
                </a>
              </div>
              <hr></hr>
              <Comment
                user={this.props.user}
                slug={this.props.match.params.slug}
              />
            </div>
          </>
        ) : this.state.error ? (
          <p className="text-center mt-12 capitalize text-2xl text-red-700">
            {this.state.error}
          </p>
        ) : (
          <Loader />
        )}
      </div>
    );
  }
}
export default withRouter(Article);
