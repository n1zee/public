require('dotenv')
  .config({ path: `${__dirname}/../../.env` });
const DI = require('../apps/di');
const {
  appBot,
} = require('../apps/telegram.app');

const di = DI();
(async () => {
  const bot = appBot(di, di.env.BOT_TOKEN);
  bot.start()
    .then((res) => console.info(res));
})();
