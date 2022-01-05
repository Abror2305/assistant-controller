const { Telegraf, Composer } = require("telegraf");
const env = require("./env");
const { start } = require("../log");
const composer = new Composer();
const bot = new Telegraf(env.TOKEN);
const middleware = (composer) => {
  bot.use(composer.middleware());
};

bot.launch().then(start);

middleware(composer);

module.exports = {
  composer,
  middleware,
};
