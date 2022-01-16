const { Markup } = require("telegraf");
const env = require("../../core/env");
module.exports = {
  helpBtn: Markup.inlineKeyboard([[Markup.callbackButton("Yordam", "help")]]),

  checkBtn: (message_id, id, share_point_id) =>
    Markup.inlineKeyboard([
      [
        Markup.callbackButton("Accept ✅", `accept ${id} ${share_point_id}`),
        Markup.callbackButton("Reject ❌", `reject ${id} ${share_point_id}`),
        Markup.urlButton(
          "Homework",
          `t.me/c/${env.SHARE_POINT.slice(4)}/${message_id}`
        ),
      ],
    ]),

  getCode: (id, share_point_id) =>
    Markup.inlineKeyboard([
      [Markup.callbackButton("Get code", `getcode ${id} ${share_point_id}`)],
    ]),

  homeworkBtn: (url) =>
    Markup.inlineKeyboard([[Markup.urlButton("Homework", url)]]),

  adminContact: Markup.inlineKeyboard([
    [
      Markup.urlButton("Abdug'ani Toshmuhammedov", "@AbduganiToshmuhammedov")
    ],
    [
      Markup.urlButton("Abror Alisherov", "@AbrorAlisherov")
    ]
  ])
};
