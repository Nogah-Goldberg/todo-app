/**
 * Created by Yoav Rosenbaum 304953128 and Nogah Goldberg 302365713.
 */
import React, { Component } from 'react';
import './App.css';
import Navbar from './components/Navbar.js'
import Login from './components/Login.js'
import TodoApp from './components/TodoApp/TodoApp.js'

import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <div>
        <Navbar> </Navbar>
        <Router>
          <div>
            <Route exact path="/" component={Login}/>
            <Route exact path="/login" component={Login}/>
            <Route path="/todo/:username" component={TodoApp}/>
          </div>
        </Router>
        </div>
    );
  }
}

export default App;
