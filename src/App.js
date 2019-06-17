import React from 'react';
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './app/components/home/home';

function App() {
  return (
    <div>
      AGC Auction Central

      <Switch>
        <Route exact path="/" render={(props) => <Home {...props}/>} />
        <Redirect from="/**" to="/" />
      </Switch>
    </div>
  );
}

export default App;
