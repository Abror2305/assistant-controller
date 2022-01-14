const { composer, middleware } = require("../../core/bot");
const { connection } = require("../../db");
const { saveHomework } = require('../../log')
const { getCurrentId } = require('../lib')

composer.on("channel_post", async ctx => {
    // Get most needed object
    let content = ctx.update.channel_post

    // Get text (if pic, video or file -> caption)
    // Else ('') empty string
    let text = content.text ?? content.caption ?? '';

    // Validation
    if (text.match(/^#homework/gi)){

        let query = `INSERT INTO homework ( message_id ) VALUES ( ${content.message_id} );`

        connection.query(query,err => {
            if (err) throw err;
            let currentId = getCurrentId('homework')

            saveHomework(currentId)
        })

        connection.commit()
    }
})
middleware(composer)