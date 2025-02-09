require('dotenv')
  .config({ path: `${__dirname}/../../.env` });
const DI = require('../apps/di');
const {
  appBot,
} = require('../apps/telegram.app');

const di = DI();
(async () => {
  const bot = appBot(di, di.app.BOT_TOKEN);

  const commands = await bot.api.setMyCommands([
    {
      command: 'start',
      description: 'restart bot',
    },
  ]);

  await bot.api.deleteWebhook({
    drop_pending_updates: true,
  });
  await bot.api.setWebhook(`${di.app.APP_URL}/api/telegram/webhook?token=${di.app.BOT_TOKEN}`);
  await di.db.destroy();
})();
