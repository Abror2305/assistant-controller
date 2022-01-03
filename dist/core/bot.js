"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var telegraf_1 = require("telegraf");
var env_1 = require("./env");
var logger_1 = require("@log/logger");
var bot = new telegraf_1.Telegraf(env_1.default.TOKEN);
bot.launch().then(function () {
    console.log(logger_1.logger);
});
//# sourceMappingURL=bot.js.map