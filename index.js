const { Telegraf } = require('telegraf')
const { message } = require('telegraf/filters')
const config = require("./config.json");

const bot = new Telegraf(config.BOT_TOKEN);


bot.launch()
// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))