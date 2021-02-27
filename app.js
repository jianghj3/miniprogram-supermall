// app.js
App({
  globalData:{
    cartList:[]
  },
  addCart(obj){
    const oldInfo = this.globalData.cartList.find(item => item.iid == obj.iid)
    if(oldInfo) {
      oldInfo.count +=1
    }else {
      obj.count = 1;
      obj.checked = true;
      this.globalData.cartList.push(obj)
    }
      // 回调第一次加载数据时设置的数据刷新函数
    if(this.addCartCallback) {
        this.addCartCallback()
    }
  }
  
})
