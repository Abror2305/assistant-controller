const { composer, middleware } = require("../../core/bot");

composer.action("tasdiqlash", async (ctx) => {
  await ctx.editMessageText(`<b>So'rovnomani to'ldiriring:</b>`, {
    parse_mode: "HTML",
  });
});

middleware(composer);
