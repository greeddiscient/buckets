import React, { Component } from 'react';
import logo from './uncledrew.png';
import axios from 'axios';
import FontAwesome from 'react-fontawesome';
import './App.css';
import teamsData from './data'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teamValue: 'Cleveland Cavaliers',
      playerValue: 'LeBron James',
      colorwayValue: 'Red Away',
      sizeValue: 'S',
      teams: teamsData,
      selectedTeam: teamsData[0],
      inStock: false,
      init: true,
      searching: false
    };

    this.teamHandleChange = this.teamHandleChange.bind(this);
    this.playerHandleChange= this.playerHandleChange.bind(this);
    this.colorwayHandleChange= this.colorwayHandleChange.bind(this);
    this.sizeHandleChange= this.sizeHandleChange.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }
  // teams: [{name: "Cleveland Cavaliers", players:["LeBron James","Kyrie Irving"], colorways:["Red Away","White Home"]      },
  //         {name: "Golden State Warriors", players:["Stephen Curry","Klay Thompson"], colorways:["Blue Away","White Home"]      }
  //
  //       ],
  // selectedTeam:[{name: "Cleveland Cavaliers", players:["LeBron James","Kyrie Irving"], colorways:["Red Away","White Home"]}],
  teamHandleChange(event) {
    let team = this.state.teams.filter(team => {
              return team.name === event.target.value
            })
    this.setState({
      teamValue: event.target.value,
      playerValue: team[0].players[0],
      colorwayValue: team[0].colorways[0]
    });
    console.log(this.state.teamValue)
    console.log(this.state.playerValue)
    console.log(this.state.colorwayValue)
  }
  playerHandleChange(event) {
    this.setState({playerValue: event.target.value});
    console.log(this.state.playerValue)
  }
  colorwayHandleChange(event) {
    this.setState({colorwayValue: event.target.value});
    console.log(this.state.colorwayValue)
  }
  sizeHandleChange(event) {
    this.setState({sizeValue: event.target.value});
    console.log(this.state.sizeValue)
  }

  handleSubmit(event) {
    event.preventDefault();
    var that=this
    this.setState({init: false,searching: true})
    axios.post('/api/check_stock', {
      team: this.state.teamValue,
      player: this.state.playerValue,
      colorway: this.state.colorwayValue,
      size: this.state.sizeValue
    })
    .then(function (response) {
      console.log(response);
      that.setState({searching: false})
      if(response.data.length == 0){
        that.setState({inStock: false})
      }
      else if(response.data[0].quantity > 0){
        that.setState({inStock: true})
      }
      else{
        that.setState({inStock: false})
      }

    })
    .catch(function (error) {
      console.log(error);
    });
  }
  render() {
    let team = this.state.teams.filter(team => {
              return team.name === this.state.teamValue
            })
    console.log("Selected team", team[0])

    return (
      <div className="App">
        <img className="logo" src= {logo}></img>
        <h1>Buckets.SG Stock Checker</h1>


        <form className= "checkForm"onSubmit={this.handleSubmit}>
          <label className="teamName">
            Choose your NBA Team:
            <select value={this.state.teamValue} onChange={this.teamHandleChange}>
              {
                this.state.teams.map((team, i) => {
                  return <option>{team.name}</option>
                })
              }
            </select>
          </label>
          <label className="playerName">
            Choose your Player:
            <select value={this.state.playerValue} onChange={this.playerHandleChange}>
              {
                team[0].players.map((player, i) => {
                  return <option>{player}</option>
                })
              }
            </select>
          </label>
          <label className="colorwayName">
            Choose your Colorway:
            <select value={this.state.colorwayValue} onChange={this.colorwayHandleChange}>
              {
                team[0].colorways.map((colorway, i) => {
                  return <option>{colorway}</option>
                })
              }
            </select>
          </label>
          <label className="sizeName">
            Choose your Size:
            <select value={this.state.sizeValue} onChange={this.sizeHandleChange}>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
              <option value="XXL">XXL</option>
            </select>
          </label>
          <input className="checkStockButton" type="submit" value="Check Stock Status" />
        </form>

        {this.state.searching ? <FontAwesome name='spinner' size='2x' spin /> : null}

        {this.state.init || this.state.searching ? null : <div className= "inventoryStatus">
            <h1>Stock Status:</h1>
            {this.state.inStock ? <h1>In Stock</h1> : <h1>OUT OF STOCK, please transfer $25 if you would like to pre-order (7-12 days wait time)</h1>}
            <h1>Contact Buckets.SG Admin @ 96818540</h1>
          </div>}

      </div>
    );
  }
}

export default App;
