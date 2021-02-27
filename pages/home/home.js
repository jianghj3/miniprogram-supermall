// pages/home/home.js
import {getMultiData, getGoodsData} from "../../service/home.js"

const BACK_DISTANCE = 1000;

Page({
  data: {
    banners: [],
    recommends: [],
    titles: ['流行','新款','精选'],
    goodsData:{
      "pop":{ page: 0, list: [] },
      "new":{ page: 0, list: [] },
      "sell":{ page: 0, list: [] }
    },
    currentType: 'pop',
    showBackTop: false,
    fixTabControl : false,
    tabTop: 0
  },
  onLoad: function(options) {
    //请求轮播图一级推荐数据
    this._getMultiData();
    // 请求goodsData数据
    this._getGoodsData('pop');
    this._getGoodsData('new');
    this._getGoodsData('sell');
  },
  onReachBottom(){
    this._getGoodsData(this.data.currentType);
  },
  onPageScroll(options){
    const flag = options.scrollTop >= BACK_DISTANCE;
    if(flag != this.data.showBackTop) {
      this.setData({
        showBackTop : flag
      });
    }
    const flag2 = options.scrollTop >= this.data.tabTop;
    if(flag2 != this.data.fixTabControl) {
      this.setData({
        fixTabControl : flag2
      });
    }
   
    
  },
// ------------------------网络请求相关函数----------------------
  // 请求轮播图以及推荐数据
  _getMultiData(){
    getMultiData().then(res=>{
      const banners = res.data.data.banner.list;
      const recommends = res.data.data.recommend.list;
      this.setData({
        banners,
        recommends
      })
   })
  },
  // 请求商品goodsData数据
  _getGoodsData(type){
    let page = this.data.goodsData[type].page + 1
    getGoodsData(type, page).then(res=>{
      const list = res.data.data.list;
      const oldList = this.data.goodsData[type].list;
      oldList.push(...list);
      const typeKey = `goodsData.${type}.list`
      const pageKey = `goodsData.${type}.page`
      this.setData({
        [typeKey]: oldList,
        [pageKey]: page,
      })
     
    })

  },

  // --------------------------事件处理相关函数--------------------
  handleTabClick(event){
   const index = event.detail.index;
   switch(index) {
     case 0: 
       this.setData({
         currentType: 'pop'
       });
       break;
     case 1:
      this.setData({
        currentType: 'new'
      });
       break;
     case 2:
      this.setData({
        currentType: 'sell'
      });
       break;
   }
  },
   //  监听recommend图片加载完后，取tabControl距离顶部的距离
   handleTabOffSetTop(){
      wx.createSelectorQuery().select('#tab-control').boundingClientRect(react => {
        this.data.tabTop = react.top
      }).exec()
  }        
})