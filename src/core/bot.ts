import  { Telegraf } from "telegraf";
import env from "./env";
import { logger } from "@log/logger";

const bot = new Telegraf(env.TOKEN)

bot.launch().then(():void => {
    console.log(logger)
})

