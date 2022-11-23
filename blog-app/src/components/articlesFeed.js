import React from "react";
import { NavLink } from "react-router-dom";
import Loader from "./loader";

class ArticlesFeed extends React.Component {
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
            return <ArticleFeed article={article} key={i} />;
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
        <h3 className="text-2xl pink">{article.title}</h3>
        <div className="flex py-2 items-center">
          <NavLink to={`/profiles/${article.author.username}`}>
            <img
              className="h-8 w-8 mr-2 rounded-full"
              src={article.author.image}
              alt={article.author.username}
            ></img>
          </NavLink>
          <h4 className="blue">{article.author.username}</h4>
        </div>
        <p className="text-l py-2">{article.description}</p>
        <NavLink
          className="lightBlue mt-4 inline-block border-2 border-solid rounded-lg py-1 px-2 border-blue-400"
          to={`/articles/${article.slug}`}
        >
          Read More
        </NavLink>
      </div>
      <div>
        <a
          href="/"
          className="rounded-lg border-solid border-2 border-green-600 py-1 px-2"
        >
          💚{" "}
          <span className="text-sm text-green-600">
            {article.favoritesCount}
          </span>
        </a>
      </div>
    </div>
  );
}

export default ArticlesFeed;
