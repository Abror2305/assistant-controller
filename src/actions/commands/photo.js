const { composer, middleware } = require("../../core/bot");
const env = require("../../core/env");
const {isHomework} = require("../lib/check");
const { writeDatabase } = require("../../db");
const {changedMessage, textToAdmin} = require("../messages");
const {checkBtn, getCode} = require("../keys");

composer.on("photo", async (ctx) => {
    let content = ctx.update.message;
    let caption = content.caption ?? '';

    if (caption.match(/^#answer/gi) && isHomework(content.reply_to_message.forward_from_message_id)){
        caption = caption.replace(/^#answer/gi,"")
        let obj = {
            from: {
                user_id: content.from.id,
                first_name: content.from.first_name,
                last_name: content.from.last_name,
                username: content.from.username
            },
            homework_id: content.reply_to_message.forward_from_message_id,
            file_id: content.photo[0].file_id,
            status: 'pending',
            caption: caption
        }

        await ctx.telegram.sendPhoto(env.ADMIN_CHANNEL, content.photo[0].file_id, {
            caption: textToAdmin(content, caption, 'pending'),
            reply_markup: checkBtn(content.reply_to_message.forward_from_message_id),
            parse_mode: "HTML"
        })

        await ctx.reply(changedMessage(content, 'pending'), {
            reply_to_message_id: content.reply_to_message.message_id,
            reply_markup: getCode(),
            parse_mode: "HTML"
        })

        await ctx.telegram.deleteMessage(env.CONFESSION, content.message_id);

        await writeDatabase(obj, 'requests');
    }
});

middleware(composer);
