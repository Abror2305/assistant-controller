const { Markup } = require("telegraf");
const env = require("../../core/env");
module.exports = {
  helpBtn: Markup.inlineKeyboard([[Markup.callbackButton("Yordam", "help")]]),

  checkBtn: (message_id, id) =>
    Markup.inlineKeyboard([
      [
        Markup.callbackButton("Accept ✅", `accept ${id}`),
        Markup.callbackButton("Reject ❌", `reject ${id}`),
        Markup.urlButton(
          "Homework",
          `t.me/c/${env.SHARE_POINT.slice(4)}/${message_id}`
        ),
      ],
    ]),

  getCode: (id) =>
    Markup.inlineKeyboard([
      [Markup.callbackButton("Get code", `getcode ${id}`)],
    ]),

  homeworkBtn: (url) =>
    Markup.inlineKeyboard([[Markup.urlButton("Homework", url)]]),
};
