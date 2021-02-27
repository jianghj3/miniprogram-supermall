// pages/shopcart/shopCartCpn/w-list-item/w-list-item.js
const App =getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item: {
      type: Object,
      value: {}
    },
    index: {
      type: Number,
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onIconClick(e){
      // 获取当前商品
      const goods = App.globalData.cartList.find(item => item.iid === this.properties.item.iid )
      goods.checked = !goods.checked

      // 获取当前商品索引号
      const currentIndex = e.currentTarget.dataset.index
      // 更新数据状态
      App.changeGoodsState(goods, currentIndex)
    }
   
  }
})
