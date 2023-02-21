const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  try {
    return await db.collection("shop_table").doc(event.item).update({
      data: {
        phone:event.phone,
        shopname:event.shopname,
        location:event.location,
        redOrblack:event.redOrblack
      }
    })
  } catch (e) {
    console.error(e)
  }
}