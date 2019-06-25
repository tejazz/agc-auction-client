import React from 'react';
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import Loadable from 'react-loadable';

function Loading({ error }) {
  if (error) {
    return 'Something went wrong';
  } else {
    return <h3 className="loadableText">Loading...</h3>;
  }
}

const Squads = Loadable({
  loader: () => import('./app/components/squads/squads.js'),
  loading: Loading
})

const TeamSelection = Loadable({
  loader: () => import('./app/components/team-selection/team-selection.js'),
  loading: Loading
})

const PlayerList = Loadable({
  loader: () => import('./app/components/player-list/player-list.js'),
  loading: Loading
})

const Home = Loadable({
  loader: () => import('./app/components/home/home.js'),
  loading: Loading
})

function App() {
  return (
    <div className="main-container">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/squad" component={Squads} />
        <Route path="/teamselect" component={TeamSelection} />
        <Route path="/list" component={PlayerList} />
        <Redirect from="/**" to="/" />
      </Switch>
    </div>
  );
}

export default App;