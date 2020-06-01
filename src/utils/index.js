import { getCurrCity } from "./api/cityList";

export function setlocalData(key, val) {
  localStorage.setItem(key, val);
}
export function getlocalData(key) {
  localStorage.getItem(key);
}
export function dellocalData(key) {
  localStorage.removeItem(key);
}

const CURR_CITY = "curr_city";
export { CURR_CITY };
export function getNowCity() {
  const currcity = getlocalData(CURR_CITY);

  if (!currcity) {
    return new Promise((reslove, reject) => {
      const { BMap } = window;
      //回调函数获取数据
      //根据上网的ip,定位当前的城市
      //初始化 local City 定位实例

      //获取到了当前城市
      const myCity = new BMap.LocalCity();
      myCity.get(async (result) => {
        const cityName = result.name;
        console.log(cityName);
        const { status, data } = await getCurrCity(cityName);
        if (status === 200) {
          setlocalData(CURR_CITY, JSON.stringify(data));
          // 外部调用=》拿到的结果/数据
          reslove(data);
        } else {
          reject("error");
        }
      });
    });
  } else {
    return Promise.resolve(currcity);
  }
}

/**
 * 前端本地存储有哪些方式？这些方式有什么不同？
 * 1. localStorage：* 一直存在（除非用户手动清除）* 5M
 * 2. sessionStorage：* 页面关闭数据就没了 * 5M
 * 3. cookie(不推荐)：* 4k * 服务器生成的，可以设置过期时间 * 不安全
 * 4. indexDB：* 一直存在（除非用户手动清除）* 无限制
 */
