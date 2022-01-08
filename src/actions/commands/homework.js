const { composer, middleware } = require("../../core/bot");
const { database } = require('../../db')

composer.on("channel_post", async (ctx) => {
    let content = ctx.update.channel_post
    let text = content.text ?? content.caption ?? '';
    if (text.match(/^#homework/gi)){
        database.homeworks.push(
            {
                message_id: content.message_id,
                message_text: text,
                message_date: content.date
            }
        )
    }
})

middleware(composer)