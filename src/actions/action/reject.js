const { composer, middleware } = require("../../core/bot");
const { rejectedMesage } = require("../messages");
const { homeworkBtn } = require("../keys");
const env = require("../../core/env");
const { getInfoFromID, changeStatus } = require("../lib");
const { permissionDanied } = require("../../log");

composer.action(/^reject (.+)/g, async (ctx) => {
  const content = ctx.update.callback_query;
  const id = ctx.match[1];
  const info = getInfoFromID(id);
  let url = `t.me/c/${env.SHARE_POINT.slice(4)}/${info["homework_id"]}`;

  // Send a rejection message to user
  await ctx.telegram
    .sendPhoto(info["from_id"], info["photo_id"], {
      caption: rejectedMesage({
        first_name: content.from.first_name,
        last_name: content.from.last_name,
        username: content.from.username,
      }),
      reply_markup: homeworkBtn(url),
      parse_mode: "HTML",
    })
    .then()
    .catch(() => permissionDanied());

  // Change status from Admin Channel
  await ctx
    .editMessageCaption(
      content.message.caption.replace(/pending ⏳/g, "rejected ❌"),
      {
        reply_markup: homeworkBtn(url),
      }
    )
    .then()
    .catch(() => permissionDanied());

  // Change status from database
  changeStatus(0, id);

  // Delete message from group
  await ctx.telegram
    .deleteMessage(env.CONFESSION, info["replaced_message_id"])
    .then()
    .catch(() => permissionDanied());
});

middleware(composer);
