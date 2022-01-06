const { Markup } = require("telegraf");

module.exports = {
  helpBtn: Markup.inlineKeyboard([[Markup.callbackButton("Yordam", "help")]]),
  acceptOrIgnore: Markup.inlineKeyboard([
      [
          Markup.callbackButton('Tasdiqlash', "accept"),
          Markup.callbackButton("Rad etish", "reject")
      ]
  ]),
    showCode: Markup.inlineKeyboard([
        [
            Markup.callbackButton("Kodni olish", 'showcode')
        ]
    ])
};
