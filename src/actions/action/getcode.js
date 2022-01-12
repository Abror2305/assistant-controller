const { composer, middleware } = require("../../core/bot");
const { checkIsAccepted } = require("../lib/check");
const { warningForUser, errorForUser, sendForUser, forward_accepted_homework } = require("../messages");
const { homeworkBtn } = require("../keys");
const env = require("../../core/env");

composer.action("getCode", async ctx => {
  const content = ctx.update.callback_query;
  let homework = checkIsAccepted(content.from.id, content.message.reply_to_message.forward_from_message_id);
  if (homework.length){
        let url = `t.me/c/${env.SHARE_POINT.slice(4)}/${homework[0]["homework_id"]}`
    //    Send homework for other users
    await ctx.telegram.sendPhoto(homework[0]["from_id"], homework[0]["photo_id"], {
          caption: forward_accepted_homework(homework[0]),
          reply_markup: homeworkBtn(url),
          parse_mode: "HTML"
        }).then().catch(async err => {
          return await ctx.answerCbQuery(warningForUser, true).then()
        })
    return await ctx.answerCbQuery(sendForUser, true).then()
  } else {
    return await ctx.answerCbQuery(errorForUser, true).then()
  }

});


middleware(composer)
