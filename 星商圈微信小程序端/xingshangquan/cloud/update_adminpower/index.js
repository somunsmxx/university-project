const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  try {
    return await db.collection("admin_table").doc(event.item).update({
      data: {
        power_notice:event.power_notice,
        power_street:event.power_street,
        power_question:event.power_question,
        street_xinghu:event.street_xinghu,
        street_xingyue:event.street_xingyue,
        street_hengyi:event.street_hengyi
      }
    })
  } catch (e) {
    console.error(e)
  }
}