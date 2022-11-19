import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import Loader from "./loader";

class ArticlesFeed extends React.Component {
  state = {
    error: "",
    user: null,
  };
  componentDidMount() {
    if (this.props.user) {
      this.setState({
        user: this.props.user,
      });
    }
  }

  favoriteArticle = (slug) => {
    if (this.state.user) {
      fetch(
        `https://mighty-oasis-08080.herokuapp.com/api/articles/${slug}/favorite`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Token ${this.props.user.token}`,
          },
        }
      )
        .then((res) => {
          if (!res.ok) {
            throw new Error("can't mark as favorite article");
          }
          return res.json();
        })
        .then((article) => {
          this.props.handleState("myfeed", false);
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
    let articles = this.props.articles;
    return (
      <section className="articles">
        {articles && articles.length < 1 ? (
          <p className="text-center my-4 text-xl capitalize">
            no articles to show
          </p>
        ) : (
          ""
        )}
        {articles ? (
          articles.map((article, i) => {
            return (
              <ArticleFeed
                favoriteArticle={this.favoriteArticle}
                article={article}
                key={i}
              />
            );
          })
        ) : (
          <Loader />
        )}
      </section>
    );
  }
}

function ArticleFeed(props) {
  const article = props.article;
  return (
    <div className="article justify-between flex p-8 m-4 border-2 border-solid rounded-lg border-blue-900">
      <div className="w-4/5">
        <NavLink to={`/articles/${article.slug}`}>
          <h3 className="text-2xl hover:underline pink">{article.title}</h3>
        </NavLink>
        <NavLink to={`/profiles/${article.author.username}`}>
          <div className="flex hover:underline py-2 items-center">
            <img
              className="h-8 w-8 mr-2 rounded-full"
              src={article.author.image}
              alt={article.author.username}
            ></img>
            <h4 className="blue">{article.author.username}</h4>
          </div>
        </NavLink>
        <p className="text-l py-2">{article.description}</p>
        <NavLink
          className="lightBlue mt-4 inline-block border-2 border-solid rounded-lg py-1 px-2 border-blue-400"
          to={`/articles/${article.slug}`}
        >
          Read More
        </NavLink>
      </div>
      <div>
        <button
          onClick={() => {
            props.favoriteArticle(article.slug);
          }}
          className="rounded-lg border-solid border-2 border-green-600 py-1 px-2"
        >
          💚{" "}
          <span className="text-sm text-green-600">
            {article.favoritesCount}
          </span>
        </button>
      </div>
    </div>
  );
}

export default withRouter(ArticlesFeed);
