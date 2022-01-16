const { Telegraf, Composer } = require("telegraf");
const env = require("../env");
const composer = new Composer();
const index = new Telegraf(env.TOKEN);
const { start } = require("../../log");

const middleware = (composer) => {
  index.use(composer.middleware());
};

index.launch().then(start);

middleware(composer);

module.exports = {
  composer,
  middleware,
};
