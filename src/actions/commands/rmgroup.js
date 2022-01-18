const { composer, middleware } = require("../../core/bot");
let {checkGroup,isAdmin,rmGroup } = require("../lib/index")
const { addGroupMessage } = require("../messages");
// const { addGroups } = require("../lib");

composer.command("rmgroup",async (ctx) =>{
  let from_id = ctx.message.from.id;
  let text = ctx.message?.text?.match(/-100\d+/g)
  console.log(text);
  if (isAdmin(from_id)){
    if(text?.length===1 && text[0].length<15){
      if(!(checkGroup(text[0],null,null))) {
        rmGroup(text[0])
        await ctx.replyWithMarkdown(`*Sizning guruxingiz muvaffaqiyatli o'chirildi*`)
      }
      else{
        await ctx.replyWithMarkdown(`*Sizning gurux yoki kanlaingiz hali qo'shilmagan*`)
      }
    }
    else {
      await ctx
        .replyWithHTML(addGroupMessage)
        .then();
    }
  }else{
    await ctx
      .replyWithHTML(`<b>Ushbu kommanda faqatgina adminlar uchun!</b>`)
      .then();
  }

})

middleware(composer)