import React, { Component } from "react";
import Notes from "./components/notes";
import LogIn from "./components/login";
import Register from "./components/register";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" component={LogIn} />
          <Route exact path="/notes/login" component={LogIn} />
          <Route exact path="/notes" component={Notes} />
          <Route exact path="/notes/register" component={Register} />
        </div>
      </Router>
    );
  }
}

export default App;
