// pages/detail/detail.js
const App = getApp()
import { getDetail,
         getRecommends,
         GoodsBaseInfo,
         ShopInfo,
         ParamsInfo
       } from "../../service/detail.js"

const BACK_DISTANCE = 1000;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    topImages: [],
    iid:'',
    baseInfo: {},
    shopInfo: {},
    detailInfo: {},
    paramsInfo: {},
    commentList: [],
    recommends: [],
    showBackTop: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      iid: options.id
    })
    //获取商品详情数据
    this._getDetail()

    //获取推荐数据
   this._getRecommends()
  },
    //事件处理函数
   _getDetail(){
      getDetail(this.data.iid).then(res=>{
        const result = res.data.result;
      //取出轮播图的数据
       const topImages = result.itemInfo.topImages;
       //取出商品基本信息baseInfo的数据
      const baseInfo = new GoodsBaseInfo(result.itemInfo, result.columns, result.shopInfo.services )
       //取出店铺基本信息shopInfo的数据
       const shopInfo = new ShopInfo(result.shopInfo )
       // 取出商品详情信息detailInfo数据
       const detailInfo = result.detailInfo
       //取出商品数据信息 paramInfo
       const paramsInfo = new ParamsInfo( result.itemParams.rule, result.itemParams.info)
         // 取出评论信息comment
         let commentList = [];
         if (result.rate && result.rate.cRate > 0)　{
            commentList = result.rate.list
         }
    // 进行统一赋值
       this.setData({
         topImages,
         baseInfo,
         shopInfo,
         detailInfo,
         paramsInfo,
         commentList
       })
      })
    },

    _getRecommends(){
      getRecommends().then(res=>{
        this.setData({
          recommends: res.data.data.list
        })
       })
    },
    // 加入购物车函数
    addCart(){
      // 获取商品对象
      const obj = {};
      obj.iid = this.data.iid;
      obj.imgUrl = this.data.topImages[0];
      obj.title = this.data.baseInfo.title;
      obj.desc = this.data.baseInfo.desc;
      obj.price = this.data.baseInfo.realPrice;

      // 加入到购物车列表
      App.addCart(obj);

      // 加入成功提示
      wx.showToast({
        title: '加入购物车成功',
      })
    },

    // 回到顶部
    onPageScroll(options){
      const flag = options.scrollTop >= BACK_DISTANCE;
      if(flag != this.data.showBackTop) {
        this.setData({
          showBackTop : flag
        });
    }
  },
  
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})