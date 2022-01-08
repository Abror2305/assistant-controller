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

  homework: (message_id) =>
    Markup.inlineKeyboard([
      [
        Markup.urlButton(
          "Uyga vazifa",
          `https://t.me/c/${env.SHARE_POINT.slice(3)}/${message_id}`
        ),
      ],
    ]),

  getCode: () => Markup.inlineKeyboard([
    [Markup.callbackButton("Get code", `getCode`)],
  ]),
};
