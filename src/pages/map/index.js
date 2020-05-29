import React, { Component } from "react";
import "./index.scss";
import { NavBar, Icon } from "antd-mobile";
export default class Map extends Component {
  componentDidMount() {
    this.initMap();
  }
  // 初始化地图
  /**
   * 1. 创建地图实例
   * 2. 设置地图显示的中心点
   */
  initMap = () => {
    console.log(window);
    const { BMapGL } = window;

    console.log(BMapGL);
    const map = new BMapGL.Map("container");
    // 设置地图显示的中心点=>天安门
    const point = new BMapGL.Point(116.404, 39.915);
    // 地图初始化，同时设置地图展示级别
    map.centerAndZoom(point, 15);
  };

  // navbar
  renderNavbar = () => {
    return (
      <NavBar
        mode="dark"
        icon={<Icon type="left" />}
        onLeftClick={() => {
          this.props.history.goBack();
        }}
      >
        地图找房
      </NavBar>
    );
  };
  render() {
    return (
      <div className="mapBox">
        {/* 地图 */}
        {this.renderNavbar()}
        <div id="container"></div>
      </div>
    );
  }
}
