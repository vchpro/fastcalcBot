const { Telegraf } = require('telegraf')
const { message } = require('telegraf/filters')
const config = require("./config.json");
const language = require("./language.json");
const basicMath = require('advanced-calculator');


const bot = new Telegraf(config.BOT_TOKEN);


bot.on('inline_query', async ctx => {
    const query = ctx.update.inline_query.query;
    try {
        const result = basicMath.evaluate(query);
        await ctx.answerInlineQuery([{
            type: "article",
            id: 'result',
            title: result,
            description: query,
            input_message_content: {
                message_text: `${query}=\n<b>${result}</b>`,
                parse_mode: "HTML"
            },
        }]);
    } catch (e) {
        await ctx.answerInlineQuery([{
            type: "article",
            id: 'result',
            title: language.enterExpression,
            input_message_content: {
                message_text: language.enterExpression,
            },
        }]);
    }
});

bot.launch()
// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))