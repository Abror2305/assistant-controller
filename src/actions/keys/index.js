const { Markup } = require("telegraf");
const env = require("../../core/env");
module.exports = {
  helpBtn: Markup.inlineKeyboard([[Markup.callbackButton("Yordam", "help")]]),

  checkBtn: message_id =>
    Markup.inlineKeyboard([
      [
        Markup.callbackButton("Accept ✅", "accept"),
        Markup.callbackButton("Reject ❌", "reject"),
        Markup.urlButton(
          "Homework",
          `t.me/c/${env.SHARE_POINT.slice(4)}/${message_id}`),
      ],
    ]),

  getCode: () => Markup.inlineKeyboard([
    [Markup.callbackButton("Get code", `getCode`)],
  ]),
};
