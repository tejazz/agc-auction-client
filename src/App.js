import React from 'react';
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './app/components/home/home';
import Squads from './app/components/squads/squads';
import TeamSelection from './app/components/team-selection/team-selection';

function App() {
  return (
    <div className="main-container">
      <Switch>
        <Route exact path="/" render={(props) => <Home {...props} />} />
        <Route exact path="/squad" render={(props) => <Squads {...props} />} />
        <Route exact path="/teamselect" render={(props) => <TeamSelection {...props} />} />
        <Redirect from="/**" to="/" />
      </Switch>
    </div>
  );
}

export default App;
