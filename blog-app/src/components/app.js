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

class App extends React.Component {
  state = {
    loggedIn: false,
    user: null,
    verified: false,
  };
  componentDidMount() {
    const user = JSON.parse(localStorage.getItem("user"));
    let token;
    if (user) {
      this.setState({
        verified: "verifying",
      });
      token = user.token;
      fetch("https://mighty-oasis-08080.herokuapp.com/api/user", {
        method: "GET",
        headers: {
          authorization: `Token ${token}`,
        },
      })
        .then((data) => data.json())
        .then((data) => {
          if (data.user) {
            this.setState({
              loggedIn: true,
              verified: true,
              user: data.user,
            });
          } else {
            console.log(data.error);
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
  render() {
    const user = JSON.parse(localStorage.getItem("user"));

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
            <Header handleLogIn={this.handleLogIn} />
            <Switch>
              <Route path="/login">
                <Login handleLogIn={this.handleLogIn} />
              </Route>
              <Route exact path="/">
                {user ? (
                  <Home loggedIn={this.state.loggedIn} author={user.username} />
                ) : (
                  <Home />
                )}
              </Route>
              <Route path="/signup">
                <Signup handleLogIn={this.handleLogIn} />
              </Route>
              <Route path="/articles/:slug" component={Article}></Route>
              <Route path="*">
                <NoMatch />
              </Route>
            </Switch>
          </div>
        )}
      </>
    );
  }
}

export default App;
