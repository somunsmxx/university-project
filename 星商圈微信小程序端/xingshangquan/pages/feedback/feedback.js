const app = getApp()
const feed = wx.cloud.database().collection("feedback_table")
Page({
  data: {
    images:[],//选择图片
    images_success: [],//上传云存储后的云存储地址数组
    images_success_size:0,//图片上传成功的数量
    object:'',//那个商业区的问题
    pictureurl:'',//图片云端路径
    location:'',//问题发生的具体位置
    situation:'',//问题描述
    zindex:0,
  },
  onLoad(options){
    this.setData({
      object:options.name
    })
},
  upload(){
    let that=this;
    wx.chooseImage({//异步方法
      count: 1,//最多选择图片数量
      sizeType:['original', 'compressed'],//选择的图片尺寸 原图，压缩图
      sourceType:['album','camera'],//相册选图，相机拍照
      success(res){
        //const tempFilePaths = res.tempFilePaths
        that.setData({
          images: res.tempFilePaths,
          zindex:-999
         });
         console.log("选择成功",res)
      }
    })
  },
  
  uploadImage(index){
    let that=this
      wx.cloud.uploadFile({//上传至微信云存储
        cloudPath:'myImage/' + new Date().getTime() + "_" +  Math.floor(Math.random()*1000) + ".jpg",//使用时间戳加随机数给图片命名
        filePath:that.data.images[index],// 本地文件路径
        success: res => {
          // 返回文件 ID
          console.log("上传成功",res)
          that.addImagePath(res.fileID)
          
          

          
          that.data.images_success[index] = res.fileID;
          that.data.images_success_size = that.data.images_success_size+1;
 
          if(that.data.images_success_size == that.data.images.length){
            console.log("上传成功：", that.data.images_success)
          } else {
            that.uploadImage(index+1)
          }
          
        },
        fail: err =>{
          that.setData({
            images_success:[],
            images_success_size:0
          })
          wx.showToast({
            icon:'none',
            title: '上传失败，请重新上传',
          })
        }
      })
 
  },
 //提交表单添加到数据库
 addBtn: function(e){
  console.log(e.detail.value);
  this.setData({
    location:e.detail.value.location,
    situation:e.detail.value.situation
  })
  if(e.detail.value.location == ''){
    wx.showToast({
      icon:'none',
      title: '请填写具体位置',
    })
  }else{
    let that=this;
  if(that.data.images.length > 0){//1、判断是否有图片
    that.setData({
      //3、给上传图片初始化一个长度，上传成功的数组和已有的数组一致
      images_success:that.data.images
    })
    that.uploadImage(0)//2、有图片时先上传第一张
    }else{
      wx.showToast({
        icon:'none',
        title: '请上传图片',
      })
    }
  }
  
 },
 //数据提交到数据库feedback_table
 addData(){
  let object=this.data.object;
  let pictureurl=this.data.pictureurl;
  let location=this.data.location;
  let situation=this.data.situation;
  feed.add({
    data:{
      category:object,
      pictureurl:pictureurl,
      location:location,
      situation:situation
    },
    success(res){
      console.log("问题反馈添加成功")
      
    },
    fail(res){
      console.log("问题反馈添加失败")
    }
  })
  wx.showToast({
    icon:'none',
    title: '提交成功',
  })
 },
 /**
   * 点击放大图片
   */
  preview(e){
    console.log('url',e.currentTarget.dataset.url)
    wx.previewImage({
      urls: [e.currentTarget.dataset.url], 
      current: '', // 当前显示图片的http链接
    })
  },
  // 获取图片上传后的https的url路径地址  参数是上传图片的 fileId
  addImagePath(fileId) {
    let that = this;
    console.log(fileId)
    wx.cloud.getTempFileURL({
      fileList: [fileId],
      success: res => {
        console.log("获取url地址：",res.fileList[0].tempFileURL);
        that.setData({
          pictureurl:res.fileList[0].tempFileURL
        })
        //上传到数据库
        that.addData();
      },
      fail: console.error
    })
  },
 
})
