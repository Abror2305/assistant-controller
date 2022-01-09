const { composer, middleware } = require("../../core/bot");
const env = require("../../core/env");
const {isHomework} = require("../lib/check");
const { writeDatabase } = require("../../db");
const {changedMessage, textToAdmin} = require("../messages");
const {checkBtn, getCode} = require("../keys");
require('../../db/database.json')

composer.on("photo", async (ctx) => {
    let content = ctx.update.message;
    let caption = content.caption ?? '';

    if (caption.match(/^#answer/gi) && isHomework(content.reply_to_message.forward_from_message_id)){

        let obj = {
            from: {
                user_id: content.from.id,
                first_name: content.from.first_name,
                last_name: content.from.last_name,
                username: content.from.username
            },
            homework_id: content.reply_to_message.forward_from_message_id,
            file_id: content.photo[0].file_id,
            status: 'pending',
            caption: caption
        }

        await ctx.telegram.sendPhoto(env.ADMIN_CHANNEL, content.photo[0].file_id, {
            caption: textToAdmin(content, caption.replace(/^#answer/gi," "), 'pending'),
            reply_markup: checkBtn(content.reply_to_message.forward_from_message_id),
            parse_mode: "HTML"
        })

        await ctx.telegram.sendMessage(env.CONFESSION, changedMessage(content, 'pending'),
          {
            reply_to_message: content.reply_to_message.message_id,
            reply_markup: getCode(),
            parse_mode: "HTML"
        })



        await ctx.telegram.deleteMessage(env.CONFESSION, content.message_id);
        await writeDatabase(obj, 'requests');
    } else {

    }
  // const username = ctx.from.username;
  // senderId = ctx.from.id;
  // const text = `<b>Jonatuvchi</b>\n@${username}`;
  // let photo = ctx.message.photo[0].file_id;
  // let msid = ctx.message.message_id;
  //
  //
  //
  // // inlineKeyboards
  // const keyboard = Markup.inlineKeyboard([
  //   Markup.callbackButton("Tasdiqlash ✅", "true"),
  //   Markup.callbackButton("Xato ❌", "false"),
  // ]);
  //
  // // Qabul qilinganini foydalanuvchiga aytish
  // await ctx
  //   .reply(`<b>Qabul qilindi ✅</b>`, {
  //     reply_to_message_id: msid,
  //     parse_mode: "HTML",
  //   })
  //   .then();
  //
  // // Adminlarning kanaliga tashlash
  // await ctx.telegram
  //   .sendPhoto(env.ADMIN_CHANNEL, photo, {
  //     caption: text,
  //     parse_mode: "HTML",
  //     reply_markup: keyboard,
  //   })
  //   .then();
});

// Accept
// composer.action("true", (ctx) => {
//   ctx.telegram.sendMessage(senderId, "Sizning vazifangiz tasdiqlandi").then();
//   ctx
//     .editMessageCaption("<b>Tasdiqlandi ✅</b>", { parse_mode: "HTML" })
//     .then();
// });
//
// // Reject
// composer.action("false", (ctx) => {
//   ctx.telegram
//     .sendMessage(
//       senderId,
//       "Sizning vazifangiz xato. Iltimos qayta urunib koring!"
//     )
//     .then();
//   ctx.editMessageCaption("<b>Xato</b>", { parse_mode: "HTML" }).then();
// });

middleware(composer);
