import React, { Component } from 'react';
import axios from 'axios';
import './AdminLogin.css';

class AdminLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userNameValue: '',
      passwordValue: ''
    };

    this.userNameChange = this.userNameChange.bind(this);
    this.passwordChange = this.passwordChange.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);

  }
  userNameChange(event) {
    this.setState({userNameValue: event.target.value});
  }
  passwordChange(event){
    this.setState({passwordValue: event.target.value})
  }

  handleSubmit(event) {
    event.preventDefault();
    if(this.state.userNameValue==="philip" && this.state.passwordValue === "philip123"){
      alert("Login Successful")
      sessionStorage.setItem("user", true)
      console.log(sessionStorage.getItem("user"))
      this.props.history.push('/admin')
    }
    else{
      alert("Incorrect Credentials")
    }

  }

  render() {

    return (
      <div className="AdminLogin">
        <h1>Buckets.SG Admin Login</h1>
        <form onSubmit={this.handleSubmit}>
          <label>
            Username:
            <input type="text" value={this.state.userNameValue} onChange={this.userNameChange} />
          </label>
          <label>
            Password:
            <input type="password" value={this.state.passwordValue} onChange={this.passwordChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>

      </div>
    );
  }
}

export default AdminLogin;
