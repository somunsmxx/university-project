const app = getApp();
Page({
  data: {
    
  },
  onShow(){
   
  },
  onLoad(){
   
  },
  show1(){
    wx.navigateTo({
      url: '/pages/show/show?name=星湖天地',
    })
  },
  show2(){
    wx.navigateTo({
      url: '/pages/show/show?name=星月坊',
    })
  },
  show3(){
    wx.navigateTo({
      url: '/pages/show/show?name=衡艺广场',
    })
  },
  /**
   * 跳转到修改星湖天地街区的界面
   */
  modify_xinghu(){
    wx.navigateTo({
      url: '/pages/modify_streetmessage/lmodify_streetmessage?name=星湖天地',
    })
  },
   /**
   * 跳转到修改星月坊街区的界面
   */
  modify_xingyue(){
    wx.navigateTo({
      url: '/pages/modify_streetmessage/lmodify_streetmessage?name=星月坊',
    })
  },
   /**
   * 跳转到修改横艺广场街区的界面
   */
  modify_hengyi(){
    wx.navigateTo({
      url: '/pages/modify_streetmessage/lmodify_streetmessage?name=衡艺广场',
    })
  }
})