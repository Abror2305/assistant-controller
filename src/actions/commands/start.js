const { composer, middleware } = require("../../core/bot")

composer.start(async stx => {
    await stx.replyWithHTML(`<b>Botimizga xush kelibsiz!</b>`).then()
})

middleware(composer)
