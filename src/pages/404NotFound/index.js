import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import Home from "../Home";

export default class NotFound extends Component {
  render() {
    return (
      <div>
        <center>
          <h1>你迷路啦~快回家吧~</h1>
          <Link to="/home/profile">个人中心</Link>

          <Route exact path="/home" component={Home}></Route>
        </center>
      </div>
    );
  }
}
