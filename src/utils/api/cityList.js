import myAxios from "../axios";

export function getCurrCity(name) {
  return myAxios.get("/area/info", {
    params: {
      name,
    },
  });
}
export function getCityList(level = 1) {
  return myAxios.get("/area/city", {
    params: {
      level,
    },
  });
}

export function getHot() {
  return myAxios.get("/area/hot");
}
