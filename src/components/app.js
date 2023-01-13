import React from "react";
import { Route, Switch } from "react-router-dom";
import "../styles/index.css";
import Header from "./header";
import Home from "./home";
import Login from "./login";
import Signup from "./signup";
import Article from "./singleArticle";
import NoMatch from "./noMatch";
import Loader from "./loader";
import Profile from "./profile";
import Settings from "./settings";
import NewPost from "./newPost";
import EditArticle from "./editArticle";
import baseurl from "../utils/constants";
import ErrorBoundary from "./errorBoundary";
import { userContext } from "./userContext";

class App extends React.Component {
  state = {
    loggedIn: false,
    user: null,
    verified: false,
  };
  componentDidMount() {
    const token = JSON.parse(localStorage.getItem("userToken"));
    if (token) {
      this.setState({
        verified: "verifying",
      });
      fetch(`${baseurl}/api/user`, {
        method: "GET",
        headers: {
          authorization: `${token}`,
        },
      })
        .then((data) => {
          return data.json();
        })
        .then((data) => {
          if (data && data.user) {
            this.setState({
              loggedIn: true,
              verified: true,
              user: data.user,
            });
          }
        });
    }
  }
  handleLogIn = (user) => {
    this.setState({
      loggedIn: !this.state.loggedIn,
      user: user,
    });
  };
  updateUser = (user) => {
    this.setState({
      user: user,
    });
  };
  render() {
    const user = this.state.user;
    const loggedIn = this.state.loggedIn;
    const contextData = { user, loggedIn };
    return (
      <>
        {this.state.verified === "verifying" ? (
          <>
            <Loader content="Verifying User..." />
            <div className="flex justify-center">
              <div className=" loader m-12"></div>
            </div>
          </>
        ) : (
          <div className="container font-sans">
            <userContext.Provider value={contextData}>
              <ErrorBoundary message="Error occured while loading header. Please reload the page">
                <Header handleLogIn={this.handleLogIn} />
              </ErrorBoundary>
              {this.state.loggedIn ? (
                <Authenticated updateUser={this.updateUser} />
              ) : (
                <Unauthenticated handleLogIn={this.handleLogIn} />
              )}
            </userContext.Provider>
          </div>
        )}
      </>
    );
  }
}

function Authenticated(props) {
  return (
    <Switch>
      <Route exact path="/">
        <ErrorBoundary message="Error occured while fetching articles. Please reload the page">
          <Home />
        </ErrorBoundary>
      </Route>
      <Route path="/new-post">
        <ErrorBoundary message="Error occured while opening new article form. Please reload the page">
          <NewPost />
        </ErrorBoundary>
      </Route>
      <Route path="/settings">
        <ErrorBoundary message="Error occured while fetching details of user. Please reload the page">
          <Settings updateUser={props.updateUser} />
        </ErrorBoundary>
      </Route>
      <Route path="/profiles/:username">
        <ErrorBoundary message="Error occured while fetching the profile of the user. Please reload the page">
          <Profile />
        </ErrorBoundary>
      </Route>
      <Route path="/articles/:slug">
        <ErrorBoundary message="Error occured while fetching article. Please reload the page">
          <Article />
        </ErrorBoundary>
      </Route>
      <Route path="/edit-article">
        <ErrorBoundary message="Error occured while fetching article's details. Please reload the page">
          <EditArticle />
        </ErrorBoundary>
      </Route>
      <Route path="*">
        <NoMatch />
      </Route>
    </Switch>
  );
}
function Unauthenticated(props) {
  return (
    <Switch>
      <Route exact path="/">
        <ErrorBoundary message="Error occured while fetching articles. Please reload the page">
          <Home />
        </ErrorBoundary>
      </Route>
      <Route path="/signup">
        <ErrorBoundary message="Error occured while signing up. Please reload the page">
          <Signup handleLogIn={props.handleLogIn} />
        </ErrorBoundary>
      </Route>
      <Route path="/login">
        <ErrorBoundary message="Error occured while loging in. Please reload the page">
          <Login handleLogIn={props.handleLogIn} />
        </ErrorBoundary>
      </Route>
      <Route path="/articles/:slug" component={Article}></Route>
      <Route path="/profiles/:username">
        <ErrorBoundary message="Error occured while fetching the profile of the user. Please reload the page">
          <Profile />
        </ErrorBoundary>
      </Route>
      <Route path="*">
        <NoMatch />
      </Route>
    </Switch>
  );
}

export default App;
