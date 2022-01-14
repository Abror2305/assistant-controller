const { composer, middleware } = require("../../core/bot");
const { isHomework, isAnswered } = require("../lib");
const { changedMessage, textToAdmin,notUniqueMessage } = require("../messages");
const { checkBtn } = require("../keys");
const { connection } = require('../../db')
const env = require("../../core/env");

// Handler
composer.on('photo', async ctx => {
    // Get main data (object)
    let content = ctx.update.message;
    let caption = content.caption ?? '';
    let homework_message_id = content["reply_to_message"]?.forward_from_message_id ?? "";

    if (caption.match(/^#answer/gi) && homework_message_id && isHomework(homework_message_id)){
        if (isAnswered(content.from.id, homework_message_id)) {
            caption = caption.replace(/^#answer/gi, "")

            // Admin kanaliga uyga vazifani yuborish
            await ctx.telegram.sendPhoto(env.ADMIN_CHANNEL, content.photo[0].file_id, {
                caption: textToAdmin(content, caption, 'pending'),
                reply_markup: checkBtn(content.reply_to_message.forward_from_message_id),
                parse_mode: "HTML"
            })


            // Kommentga user kodini joylash
            await ctx.reply(changedMessage(content, 'pending'), {
                reply_to_message_id: content.reply_to_message.message_id,
                parse_mode: "HTML"
            })

            // Databasega yozish

            connection.query("INSERT INTO Answer ( " +
                " user_name," +
                " first_name," +
                " last_name," +
                " from_id," +
                " homework_id," +
                " repled_homework_id," +
                " photo_id," +
                " replaced_message_id" +
                " ) VALUES ( \"" +
                content.from.username + "\" , \"" +
                content.from.first_name + "\" , \"" +
                content.from.last_name + "\" , " +
                content.from.id + " , " +
                content.reply_to_message.forward_from_message_id + " , " +
                content.reply_to_message.message_id + " , \"" +
                content.photo[0].file_id + "\" , " +
                (+content.message_id + 1) + " );");

            connection.commit()
        }
        else{
            await ctx.telegram.sendMessage(content.from.id, notUniqueMessage, {parse_mode: "HTML"}).then()
        }
        // User yuborgan uyga vazifani o'chirib tashlash
        await ctx.telegram.deleteMessage(env.CONFESSION, content.message_id).then();
    }
});

middleware(composer);
