import request from "./network.js"

// 获取详情页数据
export function getDetail(iid){
  return request({
    url:"/detail",
    data:{
      iid
    }
  })
}

//获取推荐数据
export function getRecommends(){
  return request({
    url: '/recommend',
  })
}



//创建商品基本信息类
export class GoodsBaseInfo {
  constructor(itemInfo, columns, services){
    this.title = itemInfo.title,
    this.price = itemInfo.price,
    this.oldPrice = itemInfo.oldPrice,
    this.discount = itemInfo.discountDesc,
    this.columns = columns,
    this.services = services,

    this.realPrice = itemInfo.lowNowPrice,
    this.desc = itemInfo.desc
  }
}

// 创建商铺基本信息类
export class ShopInfo {
  constructor(shopInfo){
    this.cGoods = shopInfo.cGoods,
    this.cSells = shopInfo.cSells,
    this.shopLogo = shopInfo.shopLogo,
    this.shopName = shopInfo.name,
    this.score = shopInfo.score
  }
}


//创建商品数据paramsInfo类
export class ParamsInfo {
  constructor(rule, info){
    this.rule = rule.tables, 
    this.info = info.set
  }
}

