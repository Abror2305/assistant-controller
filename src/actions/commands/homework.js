const { composer, middleware } = require("../../core/bot");
const { connection } = require("../../db");
const { homeworkSaved } = require("../../log");
const { getLastID } = require("../lib");
const group = require('../../db/group.json')

composer.on("channel_post", async (ctx) => {

    // Get most needed data
    let content = ctx.update.channel_post;
    let text = content.text ?? content.caption ?? "";

    // Validation
    if (text.match(/^#homework/gi)) {
      if (group[ctx.update.channel_post.chat.id]) {
      let query = `INSERT INTO homework ( message_id ) VALUES ( ${content.message_id} );`;

      connection.query(query, (err) => {
        if (err) throw err;
      });
      connection.commit();

      let currentId = getLastID("homework");
      homeworkSaved(currentId);
    }else{
        await ctx.replyWithMarkdown("*Sizning kanalingiz hali ro'yhatdan o'tmagan*").catch(()=> {console.log("Admin emas odam ishga tushirdi!")});
      }
  }
});
middleware(composer);
