const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  try {
    return await db.collection("admin_table").doc(event.item).update({
      data: {
        phone: event.phone,
        admin_name:event.admin_name,
        password:event.password
      }
    })
  } catch (e) {
    console.error(e)
  }
}