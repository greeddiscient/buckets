import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jerseys: []
    };
    this.onCellChange=this.onCellChange.bind(this)
    this.updateStock= this.updateStock.bind(this)

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

  componentDidMount(){
    var that = this
    axios.get('/api/jerseys')
    .then(function (response) {
      console.log(response.data);
      that.setState({jerseys: response.data})

    })
    .catch(function (error) {
      console.log(error);
    });
  }

  onCellChange(row,value){
    var jerseysArray=this.state.jerseys
    jerseysArray[row].quantity= value
    this.setState({jerseys: jerseysArray})
  }
  updateStock(index){
    var that=this
    axios.post('/api/update_stock', {
      team: this.state.jerseys[index].team,
      player: this.state.jerseys[index].player,
      colorway: this.state.jerseys[index].colorway,
      size: this.state.jerseys[index].size,
      quantity: this.state.jerseys[index].quantity
    })
    .then(function (response) {
      console.log(response);
      alert("stock updated")
    })
  }
  render() {

    return (
      <div className="Admin">
        <h1>Jerseys</h1>
        <div>
          <table className="table table-bordered">
            <thead>
                <tr>
                    <th>Team</th>
                    <th>Player</th>
                    <th>Colorway</th>
                    <th>Size</th>
                    <th>Quantity</th>
                </tr>
            </thead>
            <tbody>
                {this.state.jerseys.map((jersey, index) => (
                        <tr key={index}>
                            <td><p>{jersey.team}</p></td>
                            <td><p>{jersey.player}</p></td>
                            <td><p>{jersey.colorway}</p></td>
                            <td><p>{jersey.size}</p></td>
                            <td><input type='number' className='form-control' step='1' min="0" value={jersey.quantity} onChange={(e) => this.onCellChange(index, e.target.value)} /></td>
                            <td><input type='submit' className='form-submit' value= "Save" onClick={(e)=>this.updateStock(index)}/></td>

                        </tr>
                    ))}
            </tbody>
          </table>

        </div>

      </div>
    );
  }
}

export default Admin;
