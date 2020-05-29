import React from "react";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  // eslint-disable-next-line
  Link,
  Redirect,
} from "react-router-dom";
import Home from "./pages/Home";
import CityList from "./pages/CityList";
// import Index from "./pages/Index";
import NotFound from "./pages/404NotFound";
import Map from "./pages/map";
function App() {
  return (
    <div className="app">
      <Router>
        {/* <div>
          <Link to="/home">首页</Link>
          <Link to="/citylist">城市列表</Link>
          <Link to="/map">地图</Link>
        </div> */}
        {/* <hr></hr> */}
        <Switch>
          {/* 重定向 */}
          <Redirect exact from="/" to="/home"></Redirect>
          {/* 首页 */}
          <Route path="/home" component={Home}></Route>
          {/* 城市列表 */}
          <Route path="/citylist" component={CityList}></Route>
          {/* 地图 */}
          <Route path="/map" component={Map}></Route>
          {/* 404页面 */}
          <Route component={NotFound}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
