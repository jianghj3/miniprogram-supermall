// pages/shopcart/shopcart.js
const App = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartList: [],
    isSelectAll: true,
    totalGoods: 0,
    totalPrice: 0,
    counter: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 第一次加载数据
    this.setData({
      cartList: App.globalData.cartList
    });


    // 设置回调函数
    App.addCartCallback = () => {
      this.setData({
        cartList: App.globalData.cartList
      });
      this.changeData()
    }

    App.changeGoodsState = (goods, currentIndex) =>{
      this.setData({
      [`cartList[${currentIndex}]`]: goods
      })
      // 更改全选按钮的状态
      const selectALL = this.data.cartList.find(item => item.checked == false)
      if(selectALL) {
        this.setData({
          isSelectAll: false
        })
      }else {
        this.setData({
          isSelectAll: true
        })
      }
      this.changeData()
    }
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  // 一开始就进行计算，更新数据
    this.changeData()
    
    wx.setNavigationBarTitle({
      title: `购物车(${this.data.counter})`,
      
    })


  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  // 事件处理函数
  onSelectAll(){
    // 如果全部选中
    if(this.data.isSelectAll){
      this.data.cartList.forEach(item =>{
        item.checked = false
      })
      this.setData({
        cartList: this.data.cartList,
        isSelectAll: false
      })
    }else {
      // 如果有未选中的
      this.data.cartList.forEach(item =>{
        item.checked = true
      })
      this.setData({
        cartList: this.data.cartList,
        isSelectAll: true
      })
    }
    this.changeData()
  },

  changeData(){
    let totalGoods = 0;
    let totalPrice = 0;
    let counter = 0
    // 获取数据
    for(let item of this.data.cartList) {
      counter +=item.count
      if(item.checked) {
        totalGoods += item.count;
        totalPrice += item.price * item.count
      }
    }

    // 修改数据
    this.setData({
      totalGoods,
      totalPrice,
      counter
    })

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