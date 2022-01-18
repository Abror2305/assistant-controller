const { composer, middleware } = require("../../core/bot");
const { checkIsAccepted, getInfoFromID, getInfoAboutGroup } = require("../lib");
const {
  warningForUser,
  errorForUser,
  sendForUser,
  captionForAcceptedUsers,
} = require("../messages");
const { homeworkBtn } = require("../keys");

composer.action(/^getcode (.+)/g, async (ctx) => {
  const content = ctx.update.callback_query;
  const id = ctx.match[1].split(" ");
  const info = getInfoFromID(id[0]);
  let checked = checkIsAccepted(content.from.id, info["homework_id"]);

  if (checked === false) {
    return await ctx.answerCbQuery(errorForUser, true).then();
  } else {
    let url = `t.me/c/${id[1].slice(4)}/${info["homework_id"]}`;

    // Send homework for other users
    await ctx.telegram
      .sendPhoto(content.from.id, info["photo_id"], {
        caption: captionForAcceptedUsers({
          first_name: info["first_name"],
          last_name: info["last_name"],
          username: info["username"],
        }),
        reply_markup: homeworkBtn(url),
        parse_mode: "HTML",
      })
      .then()
      .catch(async () => await ctx.answerCbQuery(warningForUser, true).then());

    return await ctx.answerCbQuery(sendForUser, true).then();
  }
});

middleware(composer);
