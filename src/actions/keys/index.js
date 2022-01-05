const { Markup } = require("telegraf");

module.exports = {
  start: Markup.inlineKeyboard([
    [Markup.callbackButton("Tasdiqlash", "tasdiqlash")],
  ]),
};
