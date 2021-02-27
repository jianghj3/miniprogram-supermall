// pages/category/category.js
import { getCategory,
         getSubCategory,
         getSubCategoryDetail} from "../../service/category.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    categories:[],
    categoryData: {},
    currentIndex: 0,
    subCategories: []
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 初始化获取数据
    this._getData()
  },
  _getData(){
    // 获取分类数据
    this._getCategory()
  },

  _getCategory(){
    getCategory().then(res => {
      // 获取分类categories数组
      const categories = res.data.data.category.list

      // 初始化每个类别的子数据
      const categoryData = {}
      for(let i = 0; i < categories.length; i++) {
        // 注意categoryData[i]不是表述的数据某个元素，而是代表 categoryData.i
        categoryData[i] = {
          subCategories: [],
          categoryDetail: []
        }
      }

      // 修改数据
      this.setData({
         categories,
         categoryData
       })

      //  请求第一个分类的类别数据
       this._getSubCategory(0)

      // 请求第一个分类的类别详情数据
       this._getSubCategoryDetail(0)


    

 

    }) 
  },

_getSubCategory(currentIndex) {
      // 获取子分类数据
  const maitKey = this.data.categories[currentIndex].maitKey
  getSubCategory(maitKey).then(res => {
    const tempCategoryData = this.data.categoryData
    tempCategoryData[currentIndex].subCategories = res.data.data.list

    this.setData({
      categoryData: tempCategoryData
      })
    })
  },

_getSubCategoryDetail(currentIndex) {
  //  获取子类详情数据
  const miniWallkey = this.data.categories[currentIndex].miniWallkey
  this. _getRealSubCategoryDetail(currentIndex, miniWallkey, 'pop')
},

_getRealSubCategoryDetail(currentIndex, miniWallkey, type){
  getSubCategoryDetail(miniWallkey, type).then(res => {
    console.log(res)
    const tempCategoryData = this.data.categoryData
    tempCategoryData[currentIndex].subCategoryDetail = res.data

    this.setData({
      categoryData: tempCategoryData
      })
  })
},

  // 事件监听函数
  menuClick(e){
    console.log(e)
    const currentIndex = e.detail.currentIndex

    this.setData({
      currentIndex
    })

    this._getSubCategory(currentIndex)

    this._getSubCategoryDetail(currentIndex)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})