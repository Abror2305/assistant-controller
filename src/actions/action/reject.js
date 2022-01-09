const { composer, middleware } = require("../../core/bot");
const {rejectedMesage} = require("../messages");
const {homeworkBtn} = require("../keys");
const { changeStatus } = require("../../db");

composer.action('reject', async ctx => {
    const content = ctx.update.callback_query;
    let user_id = +content.message.caption.match(/User ID: \d+/g)[0].match(/\d+/g)
    let url = content.message.reply_markup.inline_keyboard[0][2].url
    await ctx.telegram.sendPhoto(user_id, content.message.photo[0].file_id, {
        caption: rejectedMesage(content),
        reply_markup:homeworkBtn(url),
        parse_mode: "HTML"
    }).then()


    await ctx.editMessageCaption(content.message.caption
        .replace(/pending/, 'rejected ❌')).then()


    changeStatus(url.match(/\d+$/g)[0], user_id, 'rejected');





    // await ctx.editMessageCaption().then()


// let a = {
//     id: '4134021372912670092',
//     from: {
//         id: 962526857,
//         is_bot: false,
//         first_name: "Abdug'ani",
//         last_name: 'Toshmuhammedov',
//         username: 'AbduganiToshmuhammedov',
//         language_code: 'en'
//     },
//     message: {
//         message_id: 328,
//         sender_chat: {
//             id: -1001628048404,
//             title: 'Testing Admin Channel',
//             type: 'channel'
//         },
//         chat: {
//             id: -1001628048404,
//             title: 'Testing Admin Channel',
//             type: 'channel'
//         },
//         date: 1641735153,
//         photo: [ [Object], [Object], [Object], [Object] ],
//         caption: "From: Abdug'ani Toshmuhammedov \n" +
//             'User ID: 962526857 \n' +
//             'Caption:  hello world \n' +
//             'Status: pending',
//         caption_entities: [ [Object], [Object], [Object], [Object] ],
//         reply_markup: { inline_keyboard: [Array] }
//     },
//     chat_instance: '-1628342009325455066',
//     data: 'reject'
// }

})




middleware(composer)