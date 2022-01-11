const { composer, middleware } = require("../../core/bot");
const {connection } = require("../../db");

composer.on("channel_post", async (ctx) => {
    let content = ctx.update.channel_post
    let text = content.text ?? content.caption ?? '';
    let file_id = !(content["photo"]) ? " " : content["photo"][0]["file_id"];
    if (text.match(/^#homework/gi)){

        connection.connect((err) => {
            if(err) throw err
            console.log("Connected")
        })
        let iquery = `INSERT INTO Homework(message_id, file_id) VALUES (${content.message_id}, "${file_id}");`
        connection.query(iquery,err => {
            if(err) throw err;
            console.log("Query Executed")
        })
        connection.end()
    }
})
middleware(composer)