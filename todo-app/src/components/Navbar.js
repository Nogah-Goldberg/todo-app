/**
 * Created by Yoav Rosenbaum 304953128 and Nogah Goldberg 302365713.
 */
import React, { Component } from 'react';

class Navbar extends Component {
  constructor() {
    super();
    this.state = {
    };

  }

  render() {
    return (
      <div className="navbar" id="navbar">
        <span className="navbar-header">
          <i className="fa fa-check-square-o todo-icon" aria-hidden="true"></i>
          TODO APP
        </span>
      </div>
    );
  }
}

export default Navbar;
