const { composer, middleware } = require("../../core/bot");
const { checkIsAccepted,get_replaced_message_id } = require("../lib/check");
const { warningForUser, errorForUser, sendForUser, forward_accepted_homework } = require("../messages");
const { homeworkBtn } = require("../keys");
const env = require("../../core/env");

composer.action("getCode", async ctx => {
  const content = ctx.update.callback_query;
  let homework_id = content.message.reply_to_message.forward_from_message_id;
  let homework = checkIsAccepted(homework_id);
  let msid = get_replaced_message_id(content.from.id,homework_id);
  let check = msid && content.from.id === msid["from_id"] && msid["status"] === 1;
  if (homework.length && check){
      let url = `t.me/c/${env.SHARE_POINT.slice(4)}/${homework[0]["homework_id"]}`
      // Send homework for other users
      for (let i in homework) {
          await ctx.telegram.sendPhoto(content.from.id, homework[i]["photo_id"], {
              caption: forward_accepted_homework(homework[i]),
              reply_markup: homeworkBtn(url),
              parse_mode: "HTML"
          }).then().catch(async err => {
              return await ctx.answerCbQuery(warningForUser, true).then()
          })
      }
    return await ctx.answerCbQuery(sendForUser, true).then()
  } else {
    return await ctx.answerCbQuery(errorForUser, true).then()
  }

});


middleware(composer)
