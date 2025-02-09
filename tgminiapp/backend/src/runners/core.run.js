require('dotenv')
  .config({ path: `${__dirname}/../../.env` });
const DI = require('../apps/di');
const app = require('../apps/core.app');

(async () => {
  const di = DI();
  const server = app(di);
  try {
    await server.listen({
      host: '127.0.0.1',
      port: parseInt(di.env.APP_PORT),
    });
    console.info(`server started on ${di.env.APP_PORT}`);
  } catch (err) {
    console.error(err);
  }
})();
