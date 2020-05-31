import React, { Component } from "react";
import { getCityList, getHot } from "../../utils/api/cityList";

export default class CityList extends Component {
  // state = {
  //   cityList: "",
  // };
  componentDidMount() {
    this.getCityList();
  }
  getCityList = async () => {
    const { data } = await getCityList();

    // eslint-disable-next-line
    const { cityList, cityIndex } = this.dealData(data);
    // console.log("处理完的数据：", cityList, cityIndex);
    const res = await getHot();
    cityList["hot"] = res.data;
    cityIndex.unshift("hot");
    console.log(res.data);
    console.log(cityList);
    console.log(cityIndex);

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
  render() {
    return <div>这里是CityList</div>;
  }
}
