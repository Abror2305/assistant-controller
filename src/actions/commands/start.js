const { composer, middleware } = require("../../core/bot");
const { helpBtn } = require("../keys");
const { start } = require("../messages");
composer.start(async (ctx) => {
  await ctx
    .replyWithHTML(start, {
      reply_markup: helpBtn,
    })
    .then();
});

middleware(composer);