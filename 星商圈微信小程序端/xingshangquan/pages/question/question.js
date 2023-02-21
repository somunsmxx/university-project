const app=getApp()  
Page({
  data: {
   
  
    questionList:[{ 
      imagesrc: "/images/xinghu_1.jpg",
      name:"星湖天地",
      to:"tofeedback1"
    }, {
        imagesrc: "/images/xingyue_1.jpg",
        name: '星月坊',
        to:"tofeedback2"
      }, {
        imagesrc:"/images/hengyi_1.jpg",
        name: '衡艺广场',
        to:"tofeedback3"
      }, {
        imagesrc: "/images/xingyue_2.jpg",
        name: '其它',
        to:"tofeedback4"
      }]
  },
  onShow(){
    
  },
  onLoad(){
    
    this.onShow();
  },
  tofeedback1(){
    wx.navigateTo({
      url: "/pages/feedback/feedback?name=星湖天地",
    })
  },
  tofeedback2(){
    wx.navigateTo({
      url: "/pages/feedback/feedback?name=星月坊",
    })
  },
  tofeedback3(){
    wx.navigateTo({
      url: "/pages/feedback/feedback?name=衡艺广场",
    })
  },
  tofeedback4(){
    wx.navigateTo({
      url: "/pages/feedback/feedback?name=其它",
    })
  }
})