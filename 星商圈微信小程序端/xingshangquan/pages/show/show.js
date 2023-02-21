const street = wx.cloud.database().collection("street_table")
const shop = wx.cloud.database().collection("shop_table")
Page({

  data: {
    name:"",
    nav:[{title:"概况",},{title: "商户信息",},{title: "红黑榜",}],
    describe:[],
    shop_list:[],
    red:[],
    black:[],
    curNav:"概况",
  },


  onLoad(options) {
    this.setData({
        name:options.name
    })
    this.getstreetData()
    this.getshopData()
    this.getRedOrBlackData()
  },
  navTap(e){
    console.log(e);
    let title = e.currentTarget.dataset.id;
    console.log(title)
    this.setData({
      curNav: title,
    })
  },
  //获取街区概况
  getstreetData(){
    var that = this;
    let name = this.data.name;
    street.get({
      success(res){
       res.data.forEach(function(item,index){
         console.log(item)
         console.log(index)
        if(item._id==name){
          var str = item.describe;
          console.log("概况",str);
          var arr = str.split("\\n");
          console.log("arr",arr)
          that.setData({
            describe: arr,
          })
        } 
      })
      }
    })
  },
  //获取商户信息
  getshopData(){
    var that = this;
    let name = that.data.name;
    shop.where({
      streetname:name ,
    })
    .get({
      success: function(res) {
        console.log(res.data);
        that.setData({
          shop_list:res.data
        })
      }
    })
  },
  //获取红黑榜
  getRedOrBlackData(){
    var that = this;
    let name = that.data.name;
    shop.where({
      redOrblack:'red' ,
      streetname:that.data.name
    }).get({
      success: function(res) {
        console.log(res.data);
        that.setData({
          red:res.data
        })
      }
    })
    shop.where({
      redOrblack:'black' ,
      streetname:that.data.name
    }).get({
      success: function(res) {
        console.log(res.data);
        that.setData({
          black:res.data
        })
      }
    })
  },
  detailmessage(res){
    console.log(res);
    var arr=res.currentTarget.dataset.id;
    wx.showActionSheet({
      itemList: [arr.shopname,arr.phone,arr.location],
      success: function (res) {
        if (!res.cancel) {
          console.log(res.tapIndex) //这里是点击了那个按钮的下标
        }
      }
    })
  }
})