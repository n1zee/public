const {
  Bot,
  InlineKeyboard,
  webhookCallback,
  InputFile,
} = require('grammy');

function appBot(di, token) {
  const bot = new Bot(token);

  bot.command('start', async (ctx) => {
    const tg_uuid = ctx.message.from.id;
    const message = di.env.BOT_WEB_APP;
    await bot.api.sendMessage(tg_uuid, message, {
      parse_mode: 'HTML',
      /*link_preview_options: {
        is_disabled: true,
      },*/
    });
  });

  bot.catch((error) => {
    console.error(error);
  });

  return bot;
}

module.exports = {
  appBot,
  webhookCallback,
};
