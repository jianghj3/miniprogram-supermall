import request from "./network.js"
 
// 请求轮播图以及推荐的数据
export function getMultiData(){
  return  request({
    url: '/home/multidata'
  })
}

// 请求goodsData数据
export function getGoodsData(type, page) {
  return request({
    url:"/home/data",
    data: {
      type,
      page
    }
  })
}
