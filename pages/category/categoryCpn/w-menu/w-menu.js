// pages/category/categoryCpn/w-menu/w-menu.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    category: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentIndex: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    itemClick(e){
      const currentIndex = e.currentTarget.dataset.index
      this.setData({
        currentIndex
      })

      // 将当前的分类索引号传递到分类页面
      this.triggerEvent('menuClick', {currentIndex})

    }
  }
})
