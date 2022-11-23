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
    fetch(`/api/articles/${slug}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `${this.props.user ? this.props.user.token : ""}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((article) => {
        this.setState({
          article: article.article,
          profile: article.article.article.author,
        });
      })
      .catch((err) => {
        this.setState({
          error: "not able to fetch article",
        });
      });
  };
  deleteArticle = () => {
    fetch(`/api/articles/${this.state.article.article.slug}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `${this.props.user.token}`,
      },
    })
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
    fetch(`/api/profiles/${this.state.profile.username}/follow`, {
      method: this.state.profile.following ? "DELETE" : "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `${this.props.user.token}`,
      },
    })
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
  favoriteArticle = (slug) => {
    if (this.props.user) {
      fetch(`/api/articles/${slug}/favorite`, {
        method: this.state.article.article.favorited ? "DELETE" : "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `${this.props.user.token}`,
        },
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("can't mark as favorite article");
          }
          return res.json();
        })
        .then((article) => {
          console.log(article);
          this.setState({
            article: article.article,
          });
        })
        .catch((errors) => {
          this.setState({
            error: errors.error,
          });
        });
    } else {
      alert("you have to log in first");
    }
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
            <NavLink to={`/profiles/${article.author.username}`}>
              <address className="text hover:underline hover:scale-110 text-xl pink capitalize">
                {article.author.username}
              </address>
            </NavLink>
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
                className="text-sm hover:scale-110 blue border-2 border-blue-900 mx-2 py-1 px-2 rounded-md"
              >
                <i className="mr-1 fa-solid fa-pen-to-square"></i>Edit Article
              </button>
              <button
                onClick={this.deleteArticle}
                className="text-sm hover:scale-110 text-red-600 border-2 border-red-600 mx-2 py-1 px-2 rounded-md"
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
                  className={`text-sm hover:scale-110 border-2 mx-2 mt-4 py-1 px-2 rounded-md ${
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
                <p className="text-base m-4 text-black text-center">
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
            <Hero
              title={article.title}
              description={author}
              followAuthor={this.followAuthor}
            />
            <div className="mx-8 my-4">
              <p className="text-lg py-4">{article.description}</p>
              <p className="text-lg py-4">{article.body}</p>
              <p className="text-base capitalize py-4">
                {article.taglist.length > 0 ? `Tags: ${article.taglist}` : ""}
              </p>
              <div>
                <button
                  onClick={() => {
                    this.favoriteArticle(article.slug);
                  }}
                  className={`rounded-lg hover:scale-125 border-solid border-2 ${
                    article.favorited ? "border-red-600" : "border-green-600"
                  } py-1 px-2`}
                >
                  {article.favorited ? `❤️ ` : `💚 `}
                  <span
                    className={`text-sm ${
                      article.favorited ? "text-red-600" : "text-green-600"
                    }`}
                  >
                    {article.favoritesCount}
                  </span>
                </button>
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
