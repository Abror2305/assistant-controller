const { composer, middleware } = require("../../core/bot");
const env = require("../../core/env");
const { isHomework } = require("../lib/check");
const { changedMessage, textToAdmin } = require("../messages");
const { checkBtn, getCode } = require("../keys");
const { connection } = require('../../db')


composer.on("photo", async (ctx) => {
    let content = ctx.update.message;
    let caption = content.caption ?? '';


    if (caption.match(/^#answer/gi) && isHomework(content.reply_to_message.forward_from_message_id)){

        caption = caption.replace(/^#answer/gi,"")

        // Admin kanaliga uyga vazifani yuborish
        await ctx.telegram.sendPhoto(env.ADMIN_CHANNEL, content.photo[0].file_id, {
            caption: textToAdmin(content, caption, 'pending'),
            reply_markup: checkBtn(content.reply_to_message.forward_from_message_id),
            parse_mode: "HTML"
        })


        // Kommentga user kodini joylash
        await ctx.reply(changedMessage(content, 'pending'), {
            reply_to_message_id: content.reply_to_message.message_id,
            reply_markup: getCode(),
            parse_mode: "HTML"
        })


        // User yuborgan uyga vazifani o'chirib tashlash
        await ctx.telegram.deleteMessage(env.CONFESSION, content.message_id);



        // Databasega yozish
        connection.connect()

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

        connection.end()
    }
});

middleware(composer);
