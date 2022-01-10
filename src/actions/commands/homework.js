const { composer, middleware } = require("../../core/bot");
const Manager = require("mariadb-manager");
const env = require("../../core/env");
const db = new  Manager({
    host: env.DB_HOST,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME
});
db.createConnection()


db.selectDatabase(env.DB_NAME);
composer.on("channel_post", async (ctx) => {
    let content = ctx.update.channel_post
    let text = content.text ?? content.caption ?? '';
    if (text.match(/^#homework/gi)){
        db.selectAll("Homework")
    //    Write to database code here

    }
})

middleware(composer)