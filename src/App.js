import React, { Component } from "react";
import Notes from "./components/notes";
import SignIn from "./components/signin";
import Register from "./components/register";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" component={SignIn} />
          <Route path="/signin" component={SignIn} />
          <Route path="/notes" component={Notes} />
          <Route path="/register" component={Register} />
        </div>
      </Router>
    );
  }
}

export default App;
