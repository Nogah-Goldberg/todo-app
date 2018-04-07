/**
 * Created by Yoav Rosenbaum 304953128 and Nogah Goldberg 302365713.
 */

import React, { Component } from 'react';
import { Redirect } from 'react-router';
import axios from 'axios'

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: null,
      password: null,
      redirect: false,
      url: "https://vast-everglades-99925.herokuapp.com/api"
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
  }
  handleLogin() {
    var username = this.refs.username.value;
    var password = this.refs.password.value;

    if (username.length === 0 || password.length === 0){
      alert("Please enter a valid username and password");
    } else {
      axios.post(this.state.url + "/login", {username : username, password : password})
          .then(res => {
            if (res.data.message === 'success'){
              this.setState({
                redirect: true,
                username: username
              });
              window.loggedInUser = username;
            } else{
              alert("please register first!");
            }
      });
    }
  }
    handleRegister() {
      var username = this.refs.username.value;
      var password = this.refs.password.value;

      if (username.length === 0 || password.length === 0){
        alert("Please enter a valid username and password");
      } else {
        axios.post(this.state.url + "/register", {username : username, password : password})
            .then(res => {
              if (res.data.message === 'User successfully added!'){
                alert("Registered Succeffully!")
              } else{
                alert("please try again");
              }
        });
      }


    }
  render() {
    if (this.state.redirect) {
      var url = "/todo/" + this.state.username;
       return <Redirect push to={url} />;
    }
    return (
      <div className="login-area main" id="login">
				<div className="login-form">
				  <div className="imgcontainer">
				  </div>
				  <div className="container">
				    <label className="login-label"><b>Username</b></label>
				    <input type="text" id="username" name="username" placeholder="Enter Username" ref="username"/>

				    <label className="login-label"><b>Password</b></label>
				    <input type="password" id="password" name="password" placeholder="Enter Password" ref="password" />

            <button type="submit" className="login-button" onClick = {this.handleRegister}>Register</button>
            <button type="submit" className="login-button" onClick = {this.handleLogin}>Login</button>
				  </div>
				</div>
			</div>
    );
  }
}

export default Login;
