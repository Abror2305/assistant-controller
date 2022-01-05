const { composer, middleware } = require("../../core/bot");
const { Markup } = require("telegraf")

const admins = require("../../core/admins.json")

let senderId = 0

composer.on("photo",ctx=>{
    ctx.replyWithHTML("<b>Qabul qilindi ✅</b>").then()

    const keyboard = Markup.inlineKeyboard([
        Markup.callbackButton("Tasdiqlash ✅","true"),
        Markup.callbackButton("Xato ❌","false")

    ])
    senderId = ctx.message.from.id
    const text = `<b>Jonatuvchi</b>\n@${ctx.from.user_id}`
    let photo = ctx.message.photo[0].file_id
    for (let admin of admins) {
        ctx.telegram.sendPhoto(admin,photo,{
            caption:text,
            parse_mode: "HTML",
            reply_markup: keyboard
        }).then()
    }
})
composer.action("true",ctx => {
    ctx.telegram.sendMessage(senderId,"Sizning vazifangiz tasdiqlandi").then()
    ctx.editMessageCaption("<b>Tasdiqlandi ✅</b>",{parse_mode:"HTML"}).then()
})

middleware(composer);