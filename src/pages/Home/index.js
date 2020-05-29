import React, { Component } from "react";
// eslint-disable-next-line
import { Link, Route } from "react-router-dom";
import Index from "../Index";
import House from "../House";
import Profile from "../Profile";
import { TabBar } from "antd-mobile";
import "./index.css";
import { tabItemData } from "../../utils/tabBarConf";

export default class Home extends Component {
  state = {
    // 当前标签栏选中是谁？
    selectedTab: this.props.location.pathname,
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
            {tabItemData.map((item) => {
              return (
                <TabBar.Item
                  title={item.title}
                  key={item.key}
                  icon={<i className={`iconfont ${item.icon}`} />}
                  selectedIcon={<i className={`iconfont ${item.icon}`} />}
                  selected={this.state.selectedTab === item.path}
                  onPress={() => {
                    this.props.history.push(item.path);
                    this.setState({
                      selectedTab: item.path,
                    });
                  }}
                  data-seed="logId"
                ></TabBar.Item>
              );
            })}
          </TabBar>
        </div>
      </div>
    );
  }
}
