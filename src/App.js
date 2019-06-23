import React from 'react';
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './app/components/home/home';
import Squads from './app/components/squads/squads';
import TeamSelection from './app/components/team-selection/team-selection';
import PlayerList from './app/components/player-list/player-list';

function App() {
  return (
    <div className="main-container">
      <Switch>
        <Route exact path="/" render={(props) => <Home {...props} />} />
        <Route path="/squad" render={(props) => <Squads {...props} />} />
        <Route path="/teamselect" render={(props) => <TeamSelection {...props} />} />
        <Route path="/list" render={(props) => <PlayerList {...props} />} />
        <Redirect from="/**" to="/" />
      </Switch>
    </div>
  );
}

export default App;