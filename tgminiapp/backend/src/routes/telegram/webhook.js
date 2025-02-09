const {
  appBot,
  webhookCallback,
} = require('../../apps/telegram.app');

async function handler(di, request, reply) {
  const { token } = request.query;
  if (di.env.BOT_TOKEN !== token) {
    return {
      success: false,
      error: 'token',
    };
  }
  const bot = appBot(di, token);
  return webhookCallback(bot, 'fastify')(request, reply);
}

module.exports = {
  method: 'POST',
  url: '/api/telegram/webhook',
  handler,
  schema: {
    tags: ['telegram'],
    security: [],
  },
};
