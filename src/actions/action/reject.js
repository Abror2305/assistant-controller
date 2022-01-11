const { composer, middleware } = require("../../core/bot");
const { rejectedMesage } = require("../messages");
const {homeworkBtn} = require("../keys");

composer.action('reject', async ctx => {
    const content = ctx.update.callback_query;
    let user_id = +content.message.caption.match(/User ID: \d+/g)[0].match(/\d+/g)
    let url = content.message.reply_markup.inline_keyboard[0][2].url;

    // O'quvchiga rad etilganligi haqida habar yuborish
    await ctx.telegram.sendPhoto(user_id, content.message.photo[0].file_id, {
        caption: rejectedMesage(content),
        reply_markup:homeworkBtn(url),
        parse_mode: "HTML"
    }).then()

    // Admin uchun statusni o'zgartirish
    await ctx.editMessageCaption(content.message.caption
        .replace(/pending/, 'rejected ❌')).then()


    // User statusini reject qilish kerak
    // ode here

})




middleware(composer)