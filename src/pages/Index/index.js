import React, { Component } from "react";
import { Carousel, Flex, WingBlank, SearchBar } from "antd-mobile";
// import Axios from "axios";
// eslint-disable-next-line
import { BASE_URL } from "../../utils/axios";
import { getSwiper, getGroup, getNew } from "../../utils/api/home";
import { navs } from "../../utils/navConf";
import "./index.scss";

import { Grid } from "antd-mobile";
export default class Index extends Component {
  state = {
    //轮播数据
    swiper: [],
    imgHeight: 212,
    isPlay: false,

    //租房小组
    group: [],
    //新闻
    news: [],
    keyWord: "",
  };
  componentDidMount() {
    // this.getSwiper();
    // this.getGroup();
    // this.getNew();
    this.getDatas();
  }

  //使用Promise进行重构
  getDatas = async () => {
    const [swiper, group, news] = await Promise.all([
      getSwiper(),
      getGroup(),
      getNew(),
    ]);
    if (swiper.status === 200) {
      this.setState(
        {
          swiper: swiper.data,
          group: group.data,
          news: news.data,
        },
        () => {
          this.setState({
            isPlay: true,
          });
        }
      );
    }
    console.log(swiper, group, news);
  };

  /**
   * 1.autoplay 如果发现轮播数据里没有数据,则不会开启自动轮播
   * 2.添加了数据也不会轮播,所以我们要在有数据之后,再开启轮播
   * 3.因为setstate是移步操作 ,所以我们不能直接在里面更改数据
   * 4.通过setstate的回调 尽心数据的返回
   */
  getSwiper = async () => {
    // const { status, data } = await http.get("/home/swiper");
    const { status, data } = await getSwiper();
    if (status === 200) {
      this.setState(
        {
          swiper: data,
        },
        () => {
          return (this.state.isPlay = true);
        }
      );
    }
  };
  //普通的axios 写法
  // getSwiper = async () => {
  //   const res = await Axios.get(
  //     "https://api-haoke-web.itheima.net/home/swiper"
  //   );
  //   if (res.data.status === 200) {
  //     console.log(111);
  //   }
  // };

  //获取小组数据
  getGroup = async () => {
    const { status, data } = await getGroup();
    if (status === 200) {
      this.setState({
        group: data,
      });
    }
  };
  //获取新闻数据
  getNew = async () => {
    const { status, data } = await getNew();
    if (status === 200) {
      this.setState({
        new: data,
      });
    }
  };

  //渲染轮播图组件
  renderCarousel = () => {
    return (
      <Carousel autoplay={this.state.isPlay} infinite>
        {this.state.swiper.map((val) => (
          <a
            key={val.id}
            href="http://itcast.cn"
            style={{
              display: "inline-block",
              background: "gray",
              width: "100%",
              height: this.state.imgHeight,
            }}
          >
            <img
              src={`${BASE_URL}${val.imgSrc}`}
              alt=""
              style={{ width: "100%", verticalAlign: "top" }}
              onLoad={() => {
                // fire window resize event to change height
                window.dispatchEvent(new Event("resize"));
                this.setState({ imgHeight: "auto" });
              }}
            />
          </a>
        ))}
      </Carousel>
    );
  };
  //小导航渲染
  renderNav = () => {
    return (
      <Flex className="nav">
        {navs.map((item) => {
          return (
            <Flex.Item
              key={item.id}
              onClick={() => {
                this.props.history.push(item.path);
              }}
            >
              <img src={item.img} alt="" />
              <p>{item.title}</p>
            </Flex.Item>
          );
        })}
      </Flex>
    );
  };
  //渲染租房小组
  renderGrid = () => (
    <div className="group">
      <Flex className="group-title" justify="between">
        <h3>租房小组</h3>
        <span>更多</span>
      </Flex>
      <div>
        <Grid
          data={this.state.group}
          columnNum={2}
          hasLine={false}
          square={false}
          renderItem={(item) => (
            // 自定义宫格结构和样式
            <Flex className="grid-item" justify="between">
              <div className="desc">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
              <img src={`${BASE_URL}${item.imgSrc}`} alt="" />
            </Flex>
          )}
        />
      </div>
    </div>
  );
  //渲染最新咨询
  renderNews = () => {
    return (
      <div className="news">
        <h3 className="group-title">最新咨询</h3>
        <WingBlank size="md">
          {this.state.news.map((item) => (
            <div className="news-item" key={item.id}>
              <div className="imgwrap">
                <img className="img" src={`${BASE_URL}${item.imgSrc}`} alt="" />
              </div>
              <Flex className="content" direction="column" justify="between">
                <h3 className="title">{item.title}</h3>
                <Flex className="info" justify="between">
                  <span>{item.from}</span>
                  <span>{item.date}</span>
                </Flex>
              </Flex>
            </div>
          ))}
        </WingBlank>
      </div>
    );
  };

  //渲染搜索栏
  renderSearch = () => {
    return (
      <Flex justify="around" className="topNav">
        <div className="searchBox">
          <div className="city">
            北京
            <i className="iconfont icon-arrow" />
          </div>

          <SearchBar
            value={this.state.keyWord}
            placeholder="请输入小区或地址"
            onChange={(v) => {
              this.setState({
                keyWord: v,
              });
            }}
          />
        </div>
        <div className="map">
          <i key="0" className="iconfont icon-map" />
        </div>
      </Flex>
    );
  };

  render() {
    return (
      <div className="indexBox">
        {/* 轮播图渲染 */}
        {this.renderCarousel()}
        {/* 小导航渲染 */}
        {this.renderNav()}
        {/* 小组租房 */}
        {this.renderGrid()}
        {/* 最新咨询 */}
        {this.renderNews()}
        {/* 导航搜索栏 */}
        {this.renderSearch()}
      </div>
    );
  }
}
