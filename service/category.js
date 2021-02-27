import request from "./network.js"

// 获取分类数据
export function getCategory(){
  return request({
    url: "/category"
  })
}

// 获取子分类数据
export function getSubCategory(maitKey){
  return request({
    url: "/subcategory",
    data: {
      maitKey
    }
  })
}

// 获取分类详情数据
export function getSubCategoryDetail(miniWallkey, type){
  return request({
    url: "/subcategory/detail",
    data: {
      miniWallkey,
      type
    }
  })
}
