import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Homepage from './components/Homepage';
import Participants from './components/Participants';
import PickWinner from './components/PickWinner';
import Register from './components/Register';
// import Navbar from './Navbar';

function App() {
  return (
    <div className="App">
      {/* <Navbar/> */}
      <Switch>
        <Route exact path={'/'} component={Homepage}></Route>
        <Route exact path={'/raffle/:id'} component={Register}></Route>
        <Route exact path={'/raffle/:id/participants'} component={Participants}></Route>
        <Route exact path={'/raffle/:id/winner'} component={PickWinner}></Route>
      </Switch>
    </div>
  );
}

export default App;
