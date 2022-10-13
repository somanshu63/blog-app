import React from "react";
import { BrowserRouter, NavLink } from "react-router-dom";
import Loader from "./loader";

class ArticlesFeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: null,
      active: 0,
    };
  }
  componentDidMount(offset = 0) {
    fetch(
      `https://mighty-oasis-08080.herokuapp.com/api/articles?limit=10&offset=${offset}`
    )
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          articles: data,
        });
      })
      .catch((err) => console.log(err));
  }
  render() {
    let num = [],
      count,
      articles;
    if (this.state.articles) {
      articles = this.state.articles.articles.filter((article) => {
        if (this.props.openTag === false) {
          return article;
        } else if (article.tagList.includes(this.props.openTag)) {
          return article;
        }
      });

      count = Math.floor(this.state.articles.articlesCount / 10);
      for (let i = 0; i < count; i++) {
        num.push(i + 1);
      }
    }

    return (
      <section className="articles">
        {this.state.articles ? (
          articles.map((article, i) => {
            return <Article article={article} key={i} />;
          })
        ) : (
          <Loader />
        )}
        {num && num.length > 1 ? (
          <>
            <h4 className="p-1 text-center text-xl text-green-600 capitalize">
              pages
            </h4>
            <div className="flex justify-center w-full flex-wrap p-4">
              {num.map((n, i) => {
                return (
                  <button
                    onClick={() => {
                      this.setState({
                        active: i,
                      });
                      this.componentDidMount(i * 10);
                    }}
                    className={`bg-none text-sm py-1 px-2 rounded-md border-solid border-2 border-green-600 m-1 ${
                      this.state.active === i ? "bg-green-600 text-white" : ""
                    }`}
                  >
                    {i + 1}
                  </button>
                );
              })}
            </div>
          </>
        ) : (
          ""
        )}
      </section>
    );
  }
}

function Article(props) {
  const article = props.article;
  return (
    <div className="article justify-between flex p-8 m-4 border-2 border-solid rounded-lg border-blue-900">
      <div className="w-4/5">
        <h3 className="text-2xl pink">{article.title}</h3>
        <div className="flex py-2 items-center">
          <img
            className="h-8 w-8 mr-2 rounded-full"
            src={article.author.image}
            alt={article.author.username}
          ></img>
          <h4 className="blue">{article.author.username}</h4>
        </div>
        <p className="text-l py-2">{article.description}</p>
        <NavLink
          className="lightBlue mt-4 inline-block border-2 border-solid rounded-lg py-1 px-2 border-blue-400"
          to={`/${article.slug}`}
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
