const { composer, middleware } = require("../../core/bot");
const { addGroupMessage } = require("../messages");

composer.command("addgroup", async (ctx) => {
  await ctx
    .replyWithHTML(addGroupMessage, {
      reply_markup: "HTML",
    })
    .then();
});

middleware(composer);
