const { composer, middleware } = require("../../core/bot");
const { acceptMessage, changedMessage} = require("../messages");
const { homeworkBtn, getCode} = require("../keys");
const {connection} = require("../../db");
const {get_replaced_message_id} = require("../lib");
const env = require("../../core/env");
composer.action('accept', async ctx => {
    const content = ctx.update.callback_query;
    let user_id = +content.message.caption.match(/User ID: \d+/g)[0].match(/\d+/g)
    let url = content.message.reply_markup.inline_keyboard[0][2].url;
    let homework_id = url.match(/\d+$/g)[0];


    // O'quvchining vazifasi tog'ri ekanligi haqida habar berish
    await ctx.telegram.sendPhoto(user_id, content.message.photo[0].file_id, {
        caption: acceptMessage(content),
        reply_markup:homeworkBtn(url),
        parse_mode: "HTML"
    }).then()

    // Adminlar kanalidagi statusni o'zgartirish
    await ctx.editMessageCaption(content.message.caption
        .replace(/pending/, 'Accepted ✅'),{
            reply_markup: homeworkBtn(url)
    }).then()
    connection.query(`UPDATE Answer SET status=1 WHERE homework_id=${url.match(/\d+$/g)[0]} AND from_id=${user_id};`)

    connection.commit()

    let replaced_message_id = get_replaced_message_id(user_id, homework_id)

    // Guruxdagi user statusini accept ga o'zgartirish
    await ctx.telegram.editMessageText(env.CONFESSION, replaced_message_id, null,
        changedMessage(ctx, "Accepted ✅"),{
            reply_markup: getCode(),
            parse_mode: "HTML",
        }).then()

})

middleware(composer)