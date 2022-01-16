const { composer, middleware } = require("../../core/bot");
const { connection } = require("../../db");
const { homeworkSaved } = require("../../log");
const { getLastID } = require("../lib");
const group = require('../../db/group.json')

composer.on("channel_post", async (ctx) => {
  console.log(ctx.update.channel_post);
  console.log(typeof group);
  console.log(group);

  // // Get most needed data
  // let content = ctx.update.channel_post;
  // let text = content.text ?? content.caption ?? "";
  //
  // // Validation
  // if (text.match(/^#homework/gi)) {
  //   let query = `INSERT INTO homework ( message_id ) VALUES ( ${content.message_id} );`;
  //
  //   connection.query(query, (err) => {
  //     if (err) throw err;
  //   });
  //   connection.commit();
  //
  //   let currentId = getLastID("homework");
  //   homeworkSaved(currentId);
  // }
});
middleware(composer);
