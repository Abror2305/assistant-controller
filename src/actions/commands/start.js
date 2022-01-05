const { composer, middleware } = require("../../core/bot");
const { start } = require("../keys");

composer.start(async (stx) => {
  await stx
    .replyWithHTML(
      `<b>Assalomu alaykum botimizga xush kelibsiz!</b> \n` +
        `Botimizdan foydalanish uchun shaxsingizni tasdiqlashingizni so'raymiz!`,
      {
        reply_markup: start,
      }
    )
    .then();
});

middleware(composer);
