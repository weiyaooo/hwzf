import myAxios from "../axios";
//为了更加方便管理api
/**
 * home 接口
 */
//获取轮播图数据
export function getSwiper() {
  // 返回的是对象？=>Promise
  return myAxios.get("/home/swiper");
}

//获取轮播图数据
export function getGroup(area = "AREA%7C88cff55c-aaa4-e2e0") {
  // 返回的是对象？=>Promise
  return myAxios.get("/home/groups", {
    params: {
      area,
    },
  });
}
export function getNew(area = "AREA|88cff55c-aaa4-e2e0") {
  return myAxios.get("/home/news", {
    params: {
      area,
    },
  });
}
