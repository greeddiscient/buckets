import React, { Component } from 'react';
import axios from 'axios';
import FontAwesome from 'react-fontawesome';
import './Admin.css';
import teamsData from './data'

function compare(a,b) {
  if (a.team < b.team)
    return -1;
  if (a.team > b.team)
    return 1;
  if (a.player < b.player)
    return -1;
  if (a.player > b.player)
    return 1;
  if (a.colorway < b.colorway)
    return -1;
  if (a.colorway > b.colorway)
    return 1;
  if (a.size < b.size)
    return -1;
  if (a.size > b.size)
    return 1;
  return 0;
}

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jerseys: [],
      filteredJerseys: [],
      filteredTeamValue: 'All Teams',
      searching: true
    };
    this.onCellChange=this.onCellChange.bind(this)
    this.updateStock= this.updateStock.bind(this)
    this.filterHandleChange=this.filterHandleChange.bind(this)
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
      var sortedjerseys= response.data
      sortedjerseys.sort(compare)
      that.setState({
        jerseys: sortedjerseys,
        filteredJerseys: sortedjerseys,
        searching: false
      })

    })
    .catch(function (error) {
      console.log(error);
    });
  }
  filterHandleChange(event) {

    var filteredJerseys = this.state.jerseys.filter(jersey => {
              return jersey.team === event.target.value
            })
    this.setState({
      filteredTeamValue: event.target.value,
      filteredJerseys: filteredJerseys
    });
    console.log(this.state.filteredJerseys)
  }
  onCellChange(row,value){
    var jerseysArray=this.state.filteredJerseys
    jerseysArray[row].quantity= value
    this.setState({filteredJerseys: jerseysArray})
  }
  updateStock(index){
    var that=this
    axios.post('/api/update_stock', {
      team: this.state.filteredJerseys[index].team,
      player: this.state.filteredJerseys[index].player,
      colorway: this.state.filteredJerseys[index].colorway,
      size: this.state.filteredJerseys[index].size,
      quantity: this.state.filteredJerseys[index].quantity
    })
    .then(function (response) {
      console.log(response);
      window.location.reload()
      alert("Stock updated")

    })
    .catch(function (error) {
      console.log(error);
      alert("Error")
    });
  }
  render() {

    return (
      <div className="admin">
        <h1>Buckets.SG Inventory Manager</h1>
        <div className="jersey-table">
          <label className="filterTeam">
            Filter by Team:
            <select value={this.state.filteredTeamValue} onChange={this.filterHandleChange}>
              <option>All Teams</option>
              {
                teamsData.map((team, i) => {
                  return <option>{team.name}</option>
                })
              }


            </select>
          </label>
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
                {this.state.filteredJerseys.map((jersey, index) => (
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
          {this.state.searching ? <FontAwesome name='spinner' size='2x' spin /> : null}
        </div>

      </div>
    );
  }
}

export default Admin;
