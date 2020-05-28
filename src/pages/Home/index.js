import React, { Component } from "react";
// eslint-disable-next-line
import { Link, Route } from "react-router-dom";
import Index from "../Index";
import House from "../House";
import Profile from "../Profile";
import { TabBar } from "antd-mobile";
import "./index.css";
export default class Home extends Component {
  state = {
    // 当前标签栏选中是谁？
    selectedTab: "blueTab",
  };
  render() {
    return (
      <div className="home">
        {/* <div>
          <Link to="/home">首页</Link>
          <Link to="/home/house">房屋列表</Link>
          <Link to="/home/profile">个人中心</Link>
        </div> */}
        {/* 二级路由 */}
        {/* 首页 */}
        <Route exact path="/home" component={Index}></Route>
        {/* 房屋列表 */}
        <Route path="/home/house" component={House}></Route>
        {/* 个人中心 */}
        <Route path="/home/profile" component={Profile}></Route>
        {/* 标签页组件 =》 复用 */}
        <div className="tabBox">
          <TabBar
            unselectedTintColor="#949494"
            tintColor="#33A3F4"
            barTintColor="white"
          >
            <TabBar.Item
              title="首页"
              key="Home"
              icon={<i className="iconfont icon-ind" />}
              selectedIcon={<i className="iconfont icon-ind" />}
              selected={this.state.selectedTab === "blueTab"}
              badge={1}
              onPress={() => {
                this.props.history.push("/home");
                this.setState({
                  selectedTab: "blueTab",
                });
              }}
              data-seed="logId"
            ></TabBar.Item>
            <TabBar.Item
              icon={<i className="iconfont icon-findHouse" />}
              selectedIcon={<i className="iconfont icon-findHouse" />}
              title="房屋列表"
              key="House"
              badge={"new"}
              selected={this.state.selectedTab === "redTab"}
              onPress={() => {
                this.props.history.push("/home/house");
                this.setState({
                  selectedTab: "redTab",
                });
              }}
              data-seed="logId1"
            ></TabBar.Item>
            <TabBar.Item
              icon={<i className="iconfont icon-my" />}
              selectedIcon={<i className="iconfont icon-my" />}
              title="个人中心"
              key="Profile"
              dot
              selected={this.state.selectedTab === "greenTab"}
              onPress={() => {
                this.props.history.push("/home/profile");
                this.setState({
                  selectedTab: "greenTab",
                });
              }}
            ></TabBar.Item>
          </TabBar>
        </div>
      </div>
    );
  }
}
