const { composer, middleware } = require("../../core/bot");
const { help } = require("../messages");

composer.help((ctx) => {
  ctx.replyWithHTML(help).then();
});

middleware(composer);
