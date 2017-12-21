import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teamValue: 'Cleveland Cavaliers',
      playerValue: 'LeBron James',
      colorwayValue: 'Red Away',
      sizeValue: 's',
      teams: [{name: "Cleveland Cavaliers", players:["LeBron James","Kyrie Irving"], colorways:["Red Away","White Home"]      },
              {name: "Golden State Warriors", players:["Stephen Curry","Klay Thompson"], colorways:["Blue Away","White Home"]      }

            ],
      selectedTeam:[{name: "Cleveland Cavaliers", players:["LeBron James","Kyrie Irving"], colorways:["Red Away","White Home"]      }]
    };

    this.teamHandleChange = this.teamHandleChange.bind(this);
    this.playerHandleChange= this.playerHandleChange.bind(this);
    this.colorwayHandleChange= this.colorwayHandleChange.bind(this);
    this.sizeHandleChange= this.sizeHandleChange.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

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
    alert('You Chose: ' + this.state.teamValue + this.state.playerValue + this.state.colorwayValue + this.state.sizeValue);
    event.preventDefault();
  }
  render() {
    let team = this.state.teams.filter(team => {
              return team.name === this.state.teamValue
            })
    console.log("Selected team", team[0])

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

        <form onSubmit={this.handleSubmit}>
          <label>
            Choose your NBA Team:
            <select value={this.state.teamValue} onChange={this.teamHandleChange}>
              {
                this.state.teams.map((team, i) => {
                  return <option>{team.name}</option>
                })
              }
            </select>
          </label>
          <label>
            Choose your Player:
            <select value={this.state.playerValue} onChange={this.playerHandleChange}>
              {
                team[0].players.map((player, i) => {
                  return <option>{player}</option>
                })
              }
            </select>
          </label>
          <label>
            Choose your Colorway:
            <select value={this.state.colorwayValue} onChange={this.colorwayHandleChange}>
              {
                team[0].colorways.map((colorway, i) => {
                  return <option>{colorway}</option>
                })
              }
            </select>
          </label>
          <label>
            Choose your Size:
            <select value={this.state.sizeValue} onChange={this.sizeHandleChange}>
              <option value="s">S</option>
              <option value="m">M</option>
              <option value="l">L</option>
              <option value="xl">XL</option>
              <option value="xxl">XXL</option>
            </select>
          </label>
          <input type="submit" value="Submit" />
        </form>

      </div>
    );
  }
}

export default App;
