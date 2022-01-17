const { composer, middleware } = require("../../core/bot");
const { addGroupMessage } = require("../messages");
let admin = require('../../db/premiumMembers.json');
let { addGroups,checkGroup } = require("../lib/index")
composer.command("addgroup", async (ctx) => {
  let from_id = ctx.message.from.id;

  let text = ctx.message?.text?.match(/\d+/g)
  if (admin.includes(from_id)){
    if(text.length===3 && text.every((v)=>v.length<15)){
      if(checkGroup(text[0],text[1],text[2])) {
        addGroups(text[0], text[1], text[2])
        await ctx.replyWithMarkdown(`*Sizning guruxingiz muvaffaqiyatli qoshildi*`)
      }
      else{
        await ctx.replyWithMarkdown(`*Sizning gurux yoki kanlaingiz allaqachon qo'shilib bo'lingan*`)
      }
    }
    else {
      await ctx
        .replyWithHTML(addGroupMessage)
        .then();
    }
  } else {
    await ctx
      .replyWithHTML(`<b>Ushbu kommanda faqatgina adminlar uchun!</b>`)
      .then();

    // await ctx
    //   .replyWithHTML(addGroupMessage, {
    //     reply_markup: adminContact
    //   })
    //   .then();
  }
});

middleware(composer);
