import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./login.css";

class Register extends React.Component {
  state = {
    username: "",
    password: "",
    invalidCredentials: false
  };

  render() {
    return (
      <div className="outer-div">
        <div className="left-div-login">
          <Link to="/notes/login" className="login-button">
            Log In
          </Link>
        </div>
        <div className="right-div-login">
          <div className="wrapper">
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
                  className="text-entry"
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
                  className="text-entry"
                />
              </div>
              <button className="login-button">Register</button>
            </form>
            {this.state.invalidCredentials ? (
              <h3>Username is not available</h3>
            ) : null}
          </div>
        </div>
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
      .post(
        "https://cruise-backend.herokuapp.com/api/users/register",
        this.state
      )
      .then(response => {
        if (response) {
          localStorage.removeItem("token");
          localStorage.setItem("token", response.data.token);
          this.props.history.push("/notes");
        } else {
          localStorage.removeItem("token");
          this.setState({
            invalidCredentials: true,
            username: "",
            password: ""
          });
        }
      })
      .catch(err => {
        localStorage.removeItem("token");
        this.setState({ invalidCredentials: true, username: "", password: "" });
      });
  };
}

export default Register;
