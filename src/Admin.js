import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };



  }
  componentWillMount(){
    if (this.isLoggedIn()){

    }
    else{
      this.props.history.push('/login')
    }
  }

  isLoggedIn(){
    if(window.sessionStorage.getItem("user") != null){
      return true
    }
    else{
      return false
    }
  }


  render() {

    return (
      <div className="Admin">
        <h1>This is your admin page</h1>

      </div>
    );
  }
}

export default Admin;
