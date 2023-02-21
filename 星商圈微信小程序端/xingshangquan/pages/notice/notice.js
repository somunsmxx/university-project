const notice = wx.cloud.database().collection("notice_table")
const app=getApp()  
Page({

  /**
   * 页面的初始数据
   */
  data: {
    article: [],

  },
  onShow(){
    this.getNoticeData()
  
  },
  /**
   * 页面加载
   */
  onLoad(){
    this.getNoticeData()
 

  },
  /**
   * 获取通知所有信息
   */
  getNoticeData(){
    var that = this;
    notice.get({
      success: function(res) {
        var a =res;
        a.data.reverse();
        console.log(a.data);
        that.setData({
          article:a.data
        })
      }
    })
  }
})