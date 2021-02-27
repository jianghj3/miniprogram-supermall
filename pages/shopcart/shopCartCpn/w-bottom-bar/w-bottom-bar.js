// pages/shopcart/shopCartCpn/w-bottom-bar/w-bottom-bar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isSelectAll: {
      type: Boolean,
      value: true
    },
    totalGoods :{
      type: Number,
      value: 0
    },
    totalPrice: {
      type: Number,
      value: 0
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
    selectAll(){
      this.triggerEvent('selectAll')
    }
  }
})
