import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class Login extends React.Component {
  state = {
    username: "",
    password: "",
    invalidCredentials: false
  };

  render() {
    return (
      <div>
        <h1>Log In</h1>
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
            <button>Log in</button>
          </div>
        </form>
        <Link to="/notes/register">
          <h3>Register</h3>
        </Link>
        {this.state.invalidCredentials ? <h3>Invalid Credentials</h3> : null}
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
      .post("https://cruise-backend.herokuapp.com/api/users/login", this.state)
      .then(response => {
        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
          this.props.history.push("/notes");
        }
        this.setState({ invalidCredentials: true, password: "" });
      })
      .catch(err => {
        localStorage.removeItem("token");
        this.setState({ invalidCredentials: true, password: "" });
      });
  };
}

export default Login;