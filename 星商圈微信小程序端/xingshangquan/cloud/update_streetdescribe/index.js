const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  try {
    return await db.collection("street_table").doc(event.item).update({
      data: {
        describe:event.describe
      }
    })
  } catch (e) {
    console.error(e)
  }
}