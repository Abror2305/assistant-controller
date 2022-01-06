const { composer, middleware } = require("../../core/bot");
const { textToAdmin, replyedMessage } = require("../messages");
const env = require("../../core/env");
const { acceptOrIgnore, showCode } = require("../keys");


composer.on("text", async (ctx) => {
  let message = ctx.message.text;
  if (message.match(/^#code/g) && ctx.message.reply_to_message) {
    await ctx.telegram
      .sendMessage(env.ADMIN_CHANNEL, textToAdmin(ctx, message) +
          `<b>Code</b>: \n ` +
          `------------------------------------------------` +
          `${message.replace(/#code/, "").toString()} \n` +
          `------------------------------------------------ \n`, {
        reply_markup: acceptOrIgnore(ctx.message.reply_to_message.message_id),
        parse_mode: "HTML",
      })
      .then();
    await ctx.telegram.deleteMessage(env.CONFESSION, ctx.message.message_id);
    await ctx.reply(replyedMessage(ctx, "text"), {
      reply_markup: showCode,
      reply_to_message_id: ctx.message.reply_to_message.message_id,
      parse_mode: "HTML",
    }).then();
  }
});

middleware(composer);
