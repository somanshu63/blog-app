import React from "react";
import { Route, Switch } from "react-router-dom";
import "../styles/index.css";
import Header from "./header";
import Home from "./home";
import Login from "./login";
import Signup from "./signup";
import Article from "./singleArticle";
import NoMatch from "./noMatch";

class App extends React.Component {
  render() {
    return (
      <>
        <div className="container font-sans">
          <Header />
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/signup">
              <Signup />
            </Route>
            <Route path="/:slug" component={Article}></Route>
            <Route path="*">
              <NoMatch />
            </Route>
          </Switch>
        </div>
      </>
    );
  }
}

export default App;
