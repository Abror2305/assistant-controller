const { composer, middleware } = require("../../core/bot");
const {
  isHomework,
  isAnswered,
  saveAnswer,
  getInfoAboutGroup,
} = require("../lib");
const {
  changedMessage,
  captionForAdmin,
  isAnsweredPending,
  isAnsweredAccepted,
} = require("../messages");
const { checkBtn } = require("../keys");
const { permissionDanied, answerSaved } = require("../../log");

// Handler
composer.on("photo", async (ctx) => {
  // Get main data (object)
  let content = ctx.update.message;
  let caption = content.caption ?? "";
  let share_point_id = content?.reply_to_message?.sender_chat?.id;

  let homework_message_id =
    content["reply_to_message"]?.forward_from_message_id ?? "";

  if (
    homework_message_id &&
    caption.match(/^#answer/gi) &&
    isHomework(homework_message_id, share_point_id)
  ) {
    let status = isAnswered(content.from.id, homework_message_id);
    let group = getInfoAboutGroup(share_point_id);
    switch (status) {
      case "new":
        // Remove '#answer' from caption
        caption = caption.replace(/^#answer/gi, "");

        // Save to database
        const currentID = saveAnswer({
          username: content.from.username,
          first_name: content.from.first_name,
          last_name: content.from.last_name,
          from_id: content.from.id,
          homework_id: homework_message_id,
          photo_id: content.photo[0].file_id,
          replaced_message_id: +content.message_id + 1,
        });
        answerSaved(currentID);

        // Send user's answer to Admin channel
        await ctx.telegram
          .sendPhoto(group['admin_channel'], content.photo[0].file_id, {
            caption: captionForAdmin(
              {
                first_name: content.from.first_name,
                last_name: content.from.last_name,
                username: content.from.username,
              },
              caption,
              "pending ⏳"
            ),
            reply_markup: checkBtn(
              homework_message_id,
              currentID,
              share_point_id
            ),
            parse_mode: "HTML",
          })
          .then()
          .catch(() => permissionDanied());

        // Replace user message to changedMessage
        await ctx
          .reply(
            changedMessage(
              {
                first_name: content.from.first_name,
                last_name: content.from.last_name,
                username: content.from.username,
              },
              "pending ⏳"
            ),
            {
              reply_to_message_id: content.reply_to_message.message_id,
              parse_mode: "HTML",
            }
          )
          .then()
          .catch(() => permissionDanied());

        break;

      case "pending":
        // Send warning to user
        await ctx.telegram
          .sendMessage(content.from.id, isAnsweredPending, {
            parse_mode: "HTML",
          })
          .then()
          .catch(() => permissionDanied());

        break;

      case "answered":
        // Send warning to user
        await ctx.telegram
          .sendMessage(content.from.id, isAnsweredAccepted, {
            parse_mode: "HTML",
          })
          .then()
          .catch(() => permissionDanied());

        break;
    }

    // Delete excess homework
    await ctx.telegram
      .deleteMessage(group['discussion'], content.message_id)
      .then()
      .catch(() => permissionDanied());
  }
});

middleware(composer);
