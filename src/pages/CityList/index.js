import React, { Component } from "react";
import { getCityList, getHot } from "../../utils/api/cityList";
import { getNowCity, setlocalData, CURR_CITY } from "../../utils";
// 列表组件
// eslint-disable-next-line
import { AutoSizer, List } from "react-virtualized";
import { NavBar, Icon, Toast } from "antd-mobile";
import "./index.scss";

// List data as an array of strings
// const list = Array.from(new Array(100)).map((item, index) => index);
// console.log(list);
export default class CityList extends Component {
  state = {
    cityList: {},
    cityIndex: [],
  };
  componentDidMount() {
    this.getCityList();
  }

  //navbar
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
        城市列表
      </NavBar>
    );
  };

  //格式化title
  // formatTitle = (title) => {
  //   switch (title) {
  //     case "#":
  //       return "当前城市";
  //     case "hot":
  //       return "热门城市";
  //     default:
  //       return title.toUpperCase();
  //   }
  // };

  //格式化 title
  deltitle = (title) => {
    switch (title) {
      case "#":
        return "当前城市";
      case "hot":
        return "热门城市";
      default:
        return title.toUpperCase();
    }
  };

  getCityList = async () => {
    const { data } = await getCityList();

    // eslint-disable-next-line
    const { cityList, cityIndex } = this.dealData(data);
    // console.log("处理完的数据：", cityList, cityIndex);
    const { status: hs, data: hd } = await getHot();
    if (hs === 200) {
      cityList["hot"] = hd;
      cityIndex.unshift("hot");
    }
    let city = await getNowCity();

    cityList["#"] = [city];
    cityIndex.unshift("#");
    // console.log(cityList);
    // console.log(cityIndex);
    this.setState({
      cityIndex: cityIndex,
      cityList: cityList,
    });

    // eslint-disable-next-line
  }; //创建方法分离数据;
  dealData = (data) => {
    let cityList = {},
      // eslint-disable-next-line
      cityIndex = [];
    data.forEach((item) => {
      const abc = item["short"].slice(0, 1);
      if (cityList[abc]) {
        //往数组里push数组 为 a 值为 [数组]
        cityList[abc].push(item);
      } else {
        //如果对象不存在这个属性,则新建一个这个属性
        //key 为 a 值为 [数组]
        cityList[abc] = [item];
      }
    });
    // 问题：老师，怎么渲染？ cityIndex =》cityList['b']
    cityIndex = Object.keys(cityList).sort();
    console.log(cityIndex);
    return {
      cityList,
      cityIndex,
    };
  };

  //切换当前定位时间函数
  selcity = (item) => {
    const hasData = ["北京", "上海", "广州", "深圳"];
    if (hasData.includes(item.label)) {
      // 更新本地定位数据
      setlocalData(CURR_CITY, JSON.stringify(item));
      // 返回首页
      this.props.history.goBack();
    } else {
      // 不存在
      Toast.fail("该城市暂无房源数据 !!!", 2);
    }
  };

  getRowheight = ({ index }) => {
    const { cityIndex, cityList } = this.state;
    let letter = cityIndex[index];
    // title高度+城市高度*城市个数
    return 36 + 50 * cityList[letter].length;
  };

  rowRenderer = ({
    key, // Unique key within array of rows
    index, // Index of row within collection
    isScrolling, // The List is currently being scrolled
    isVisible, // This row is visible within the List (eg it is not an overscanned row)
    style, // Style object to be applied to row (to position it)
  }) => {
    const { cityList, cityIndex } = this.state;
    const title = cityIndex[index];
    const titleCity = cityList[title];

    return (
      // <div key={key} style={style} className="city-item">
      //   <div className="title">{this.formatTitle(title)}</div>
      //   {/* 归类城市小列表 */}
      //   {/* <div className="name">安庆</div> */}
      //   {titleCity.map((item) => (
      //     <div
      //       onClick={() => this.selCity(item)}
      //       key={item.value}
      //       className="name"
      //     >
      //       {item.label}
      //     </div>
      //   ))}

      // <div key={key} style={style}>
      //   {list[index]}
      // </div>
      <div key={key} style={style} className="city-item">
        <div className="title">{this.deltitle(title)}</div>
        {titleCity.map((item) => {
          return (
            <div
              onClick={() => {
                this.selcity(item);
              }}
              key={item.value}
              className="name"
            >
              {item.label}
            </div>
          );
        })}
      </div>
    );
  };
  //动态计算属性
  execHeight = ({ index }) => {
    const { cityList, cityIndex } = this.state;
    const title = cityIndex[index];
    const titleCity = cityList[title];
    return 36 + 50 * titleCity.length;
  };

  // Render your list

  render() {
    return (
      <div className="cityList">
        {this.renderNavbar()}
        {/* 使用自适应组件  */}
        <AutoSizer className="listBox">
          {({ height, width }) => (
            <List
              height={height}
              rowCount={this.state.cityIndex.length}
              rowHeight={this.getRowheight}
              rowRenderer={this.rowRenderer}
              width={width}
            />
          )}
        </AutoSizer>
      </div>
    );
  }
}
