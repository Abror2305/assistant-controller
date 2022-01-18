const { composer, middleware } = require("../../core/bot");
const { addGroupMessage } = require("../messages");
let { addGroups, checkGroup, isAdmin } = require("../lib/index");
const { adminContact } = require("../keys");

composer.command("addgroup", async (ctx) => {
  let from_id = ctx.message.from.id;

  let text = ctx.message?.text?.match(/-100\d+/g);
  if (isAdmin(from_id)) {
    if (text?.length === 3 && text.every((v) => v.length < 15)) {
      if (checkGroup(text[0], text[1], text[2])) {
        addGroups(text[0], text[1], text[2]);
        await ctx.replyWithMarkdown(
          `*Sizning guruhingiz muvaffaqiyatli faollashtirildi ✅*`
        );
      } else {
        await ctx.replyWithMarkdown(
          `*Sizning guruh yoki kanalingiz allaqachon faollashtirilgan ✴*`
        );
      }
    } else {
      await ctx.replyWithHTML(addGroupMessage, {
        reply_markup: adminContact
      }).then().catch(err => err);
    }
  } else {
    await ctx
      .replyWithHTML(`<b>Ushbu kommanda faqatgina adminlar uchun!</b>`)
      .then().catch((err) => err);
  }
});

middleware(composer);
