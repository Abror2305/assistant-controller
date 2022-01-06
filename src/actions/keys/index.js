const { Markup } = require("telegraf");
const env = require('../../core/env')
module.exports = {
  helpBtn: Markup.inlineKeyboard([[Markup.callbackButton("Yordam", "help")]]),
  acceptOrIgnore: (message_id) => {
    return Markup.inlineKeyboard([
      [
        Markup.callbackButton("Tasdiqlash", "accept"),
        Markup.callbackButton("Rad etish", "reject"),
        Markup.urlButton("Uyga vazifa", `https://t.me/c/${env.CONFESSION.slice(3)}/${message_id}`)
      ],
    ])
  },
  showCode: Markup.inlineKeyboard([
    [Markup.callbackButton("Kodni olish", "showcode")],
  ]),
};

