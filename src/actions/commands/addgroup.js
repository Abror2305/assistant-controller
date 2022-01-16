const { composer, middleware } = require("../../core/bot");
const { addGroupMessage } = require("../messages");
let admin = require('../../db/admin.json');

composer.command("addgroup", async (ctx) => {
  let from_id = ctx.message.from.id;

  if (admin.includes(from_id)){
    await ctx
      .replyWithHTML(addGroupMessage)
      .then();
  } else {
    await ctx
      .replyWithHTML(`<b>Ushbu kommanda faqatgina adminlar uchun!</b>`)
      .then();
  }
});

middleware(composer);
