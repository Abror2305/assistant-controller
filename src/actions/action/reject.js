const { composer, middleware } = require("../../core/bot");
const { rejectedMesage, changedMessage } = require("../messages");
const { homeworkBtn } = require("../keys");
const { connection } = require('../../db')
const env = require('../../core/env')
const { get_replaced_message_id } = require("../lib/check");

composer.action('reject', async ctx => {
    const content = ctx.update.callback_query;
    let user_id = +content.message.caption.match(/User ID: \d+/g)[0].match(/\d+/g)
    let url = content.message.reply_markup.inline_keyboard[0][2].url;
    // O'quvchiga rad etilganligi haqida habar yuborish
    await ctx.telegram.sendPhoto(user_id, content.message.photo[0].file_id, {
        caption: rejectedMesage(content),
        reply_markup: homeworkBtn(url),
        parse_mode: "HTML"
    }).then()

    // Admin uchun statusni o'zgartirish
    await ctx.editMessageCaption(content.message.caption
        .replace(/pending/, 'rejected ❌'), homeworkBtn(url)).then()

    let homework_id = url.match(/\d+$/g)[0];
    // Databasedagi statusni 'reject' ga o'zgartirish;
    connection.query(`UPDATE Answer SET status=0 WHERE homework_id=${homework_id} AND from_id=${user_id};`)
    connection.commit()

    // Guruxdagi user statusini reject ga o'zgartirish
    let replaced_message_id = get_replaced_message_id(user_id, homework_id)
    let cloneCtx = {
        from: {
            first_name: replaced_message_id["first_name"],
            last_name: replaced_message_id["last_name"],
            username: replaced_message_id["user_name"]
        }
    }
    await ctx.telegram.editMessageText(env.CONFESSION, replaced_message_id["replaced_message_id"], null,
      changedMessage(cloneCtx, "Rejected ❌"),{
        parse_mode: "HTML",
        }).then()
})

middleware(composer)