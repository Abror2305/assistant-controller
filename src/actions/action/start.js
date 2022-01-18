const { composer, middleware } = require("../../core/bot");
const { help } = require("../messages");

composer.action("help", async (ctx) => {
  await ctx.editMessageText(help, {
    parse_mode: "HTML",
  });
});

middleware(composer);
