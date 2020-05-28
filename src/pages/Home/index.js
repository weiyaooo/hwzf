import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import Index from "../Index";
import House from "../House";
import Profile from "../Profile";
import { TabBar } from "antd-mobile";
export default class Home extends Component {
  state = {
    // 当前标签栏选中是谁？
    selectedTab: "blueTab",
  };
  render() {
    return (
      <div className="home">
        <div>
          <Link to="/home">首页</Link>
          <Link to="/home/house">房屋列表</Link>
          <Link to="/home/profile">个人中心</Link>
        </div>
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
              title="Life"
              key="Life"
              icon={
                <div
                  style={{
                    width: "22px",
                    height: "22px",
                    background:
                      "url(https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg) center center /  21px 21px no-repeat",
                  }}
                />
              }
              selectedIcon={
                <div
                  style={{
                    width: "22px",
                    height: "22px",
                    background:
                      "url(https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg) center center /  21px 21px no-repeat",
                  }}
                />
              }
              selected={this.state.selectedTab === "blueTab"}
              badge={1}
              onPress={() => {
                this.setState({
                  selectedTab: "blueTab",
                });
              }}
              data-seed="logId"
            ></TabBar.Item>
            <TabBar.Item
              icon={
                <div
                  style={{
                    width: "22px",
                    height: "22px",
                    background:
                      "url(https://gw.alipayobjects.com/zos/rmsportal/BTSsmHkPsQSPTktcXyTV.svg) center center /  21px 21px no-repeat",
                  }}
                />
              }
              selectedIcon={
                <div
                  style={{
                    width: "22px",
                    height: "22px",
                    background:
                      "url(https://gw.alipayobjects.com/zos/rmsportal/ekLecvKBnRazVLXbWOnE.svg) center center /  21px 21px no-repeat",
                  }}
                />
              }
              title="Koubei"
              key="Koubei"
              badge={"new"}
              selected={this.state.selectedTab === "redTab"}
              onPress={() => {
                this.setState({
                  selectedTab: "redTab",
                });
              }}
              data-seed="logId1"
            ></TabBar.Item>
            <TabBar.Item
              icon={
                <div
                  style={{
                    width: "22px",
                    height: "22px",
                    background:
                      "url(https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg) center center /  21px 21px no-repeat",
                  }}
                />
              }
              selectedIcon={
                <div
                  style={{
                    width: "22px",
                    height: "22px",
                    background:
                      "url(https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg) center center /  21px 21px no-repeat",
                  }}
                />
              }
              title="Friend"
              key="Friend"
              dot
              selected={this.state.selectedTab === "greenTab"}
              onPress={() => {
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
