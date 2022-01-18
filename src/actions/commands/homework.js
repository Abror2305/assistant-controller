const { composer, middleware } = require("../../core/bot");
const { connection } = require("../../db");
const group = require("../../db/group.json");

composer.on("channel_post", async (ctx) => {
  // Get most needed data
  let content = ctx.update.channel_post;
  let text = content.text ?? content.caption ?? "";
  let channel_id = ctx.update.channel_post.chat.id;
  // Validation
  if (text.match(/^#homework/gi)) {
    if (group[channel_id]) {
      let query = `INSERT INTO homeworks ( channel_id, message_id ) VALUES ( "${channel_id}", ${content.message_id} );`;

      connection.query(query, (err) => {
        if (err) throw err;
      });
      connection.commit();

      // let currentId = getLastID("homeworks");
      // homeworkSaved(currentId);
    } else {
      await ctx
        .replyWithMarkdown("*Sizning kanalingiz hali ro'yhatdan o'tmagan!*")
        .then()
        .catch(() => console.log("Admin emas odam ishga tushirdi!"));
    }
  }
});
middleware(composer);
