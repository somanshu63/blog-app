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
            <Header handleLogIn={this.handleLogIn} user={this.state.user} />
            {this.state.loggedIn ? (
              <Authenticated
                user={user}
                loggedIn={this.state.loggedIn}
                updateUser={this.updateUser}
              />
            ) : (
              <Unauthenticated
                user={user}
                loggedIn={this.state.loggedIn}
                handleLogIn={this.handleLogIn}
              />
            )}
          </div>
        )}
      </>
    );
  }
}

function Authenticated(props) {
  return (
    <Switch>
      <Route path="/new-post">
        <NewPost token={props.user.token} />
      </Route>
      <Route path="/settings">
        <Settings
          user={props.user}
          token={props.user.token}
          updateUser={props.updateUser}
        />
      </Route>
      <Route path="/profiles/:username">
        <Profile user={props.user} />
      </Route>
      <Route path="/articles/:slug">
        <Article user={props.user} />
      </Route>
      <Route path="/edit-article">
        <EditArticle user={props.user} />
      </Route>
      <Route exact path="/">
        <Home
          loggedIn={props.loggedIn}
          author={props.user.username}
          user={props.user}
        />
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
      <Route path="/signup">
        <Signup handleLogIn={props.handleLogIn} />
      </Route>
      <Route path="/login">
        <Login handleLogIn={props.handleLogIn} />
      </Route>
      <Route path="/articles/:slug" component={Article}></Route>
      <Route path="/profiles/:username">
        <Profile user={props.user} />
      </Route>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="*">
        <NoMatch />
      </Route>
    </Switch>
  );
}

export default App;
