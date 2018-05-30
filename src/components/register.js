// /src/auth/Signin.js

import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class Register extends React.Component {
  state = {
    username: "",
    password: ""
  };

  render() {
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.submitHandler}>
          <div>
            <label htmlFor="username" />
            <input
              name="username"
              placeholder="username"
              value={this.state.username}
              onChange={this.inputChangeHandler}
              type="text"
            />
          </div>
          <div>
            <label htmlFor="password" />
            <input
              name="password"
              placeholder="password"
              value={this.state.password}
              onChange={this.inputChangeHandler}
              type="password"
            />
          </div>
          <div>
            <button>Register</button>
          </div>
        </form>
        <Link to="/signin">
          <h3>Sign In</h3>
        </Link>
      </div>
    );
  }

  inputChangeHandler = event => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  submitHandler = event => {
    event.preventDefault();

    axios
    .post("https://cruise-backend.herokuapp.com/api/users/register", this.state)
      .then(response => {
        localStorage.removeItem("token");

        this.props.history.push("/notes");
      })
      .catch(err => {
        localStorage.removeItem("token");
      });
  };
}

export default Register;
