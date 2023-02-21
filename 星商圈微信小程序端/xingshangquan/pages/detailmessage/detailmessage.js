const notice = wx.cloud.database().collection("notice_table")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:"",
    publisher: "",
    text:[],
    time:""
  },
  onLoad(options) {
    this.setData({
      name:options.id
    })
    this.getNoticeData()
  },
  getNoticeData(){
    var that = this;
    let name = that.data.name;
    notice.where({
      title:name ,
    })
    .get({
      success: function(res) {
        console.log(res.data);
        var str = res.data[0].text;
        var arr = str.split("\\n");
        console.log(arr);
        that.setData({
          publisher:res.data[0].publisher,
          text:arr,
          time:res.data[0].release_time
        })

      }
    })
  }
})