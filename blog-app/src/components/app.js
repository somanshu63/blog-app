import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "../styles/index.css";
import Header from "./header";
import Home from "./home";
import Login from "./login";
import Signup from "./signup";
import Article from "./singleArticle";

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <>
          <div className="container font-sans">
            <Header />
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
          </div>
        </>
      </BrowserRouter>
    );
  }
}

export default App;
