const { composer, middleware } = require("../../core/bot");
const { addGroupMessage } = require("../messages");
const { adminContact } = require('../keys')
// let admin = require('../../db/premiumMembers.json');

composer.command("addgroup", async (ctx) => {
  // let from_id = ctx.message.from.id;

  await ctx
    .replyWithHTML(addGroupMessage, {
      reply_markup: adminContact
    })
    .then();

  // if (admin.includes(from_id)){
  //   await ctx
  //     .replyWithHTML(addGroupMessage)
  //     .then();
  // } else {
  //   await ctx
  //     .replyWithHTML(`<b>Ushbu kommanda faqatgina adminlar uchun!</b>`)
  //     .then();
  // }
});

middleware(composer);
