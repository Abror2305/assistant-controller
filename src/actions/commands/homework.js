const { composer, middleware } = require("../../core/bot");

composer.on("channel_post", async (ctx) => {
    let content = ctx.update.channel_post
    let text = content.text ?? content.caption ?? '';
    if (text.match(/^#homework/gi)){

    //    Write to database code here

    }
})

middleware(composer)