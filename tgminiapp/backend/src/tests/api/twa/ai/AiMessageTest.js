const {
  describe,
  it,
  beforeEach,
  after,
  assertion,
  truncate,
  diI,
  app,
  FormData,
  sinon,
} = require('../../../utils/suite');

const registerUser = require('../../../mock/registerTWA');

const di = diI();

const arrange = {
  tg_uuid: 111,
  tg_username: 'username',
  tg_data: {
    id: 'xxx',
    first_name: 'first_name',
    last_name: 'last_name',
    username: 'username',
    is_premium: false,
  },
};

describe('aiTest', async function f() {
  this.timeout(30000);

  it('messages.list', async () => {
    const {
      user,
      jwt,
    } = await registerUser(di, arrange);

    const [card] = await di.services.CardService.insert(di, {
      user_id: user.id,
      status: di.services.CardService.STATUS.DRAFT,
    });

    await di.services.AiMessageService.insert(di, [
      {
        user_id: user.id,
        card_id: card.id,
        role: 'user',
        message: 'text1',
        created_at: new Date(),
      },
      {
        user_id: user.id,
        card_id: card.id,
        role: 'assistant',
        message: 'text2',
        created_at: new Date(),
      },
    ]);

    const fastify = app(di);
    const response = await fastify.inject({
      method: 'GET',
      query: {
        card_id: card.id,
      },
      url: '/api/twa/ai/messages',
      headers: {
        authorization: `Bearer ${jwt}`,
      },
    });
    assertion.assert200JSON(response, !process.env.TEST);
  });

  it('messages.post', async () => {
    const {
      user,
      jwt,
    } = await registerUser(di, arrange);

    const [card] = await di.services.CardService.insert(di, {
      user_id: user.id,
      status: di.services.CardService.STATUS.DRAFT,
      title: JSON.stringify({
        en: 'Binance',
        ru: 'Binance',
      }),
    });

    const fastify = app(di);
    const response = await fastify.inject({
      method: 'POST',
      payload: {
        card_id: card.id,
        message: 'расскажи про бинанс',
      },
      url: '/api/twa/ai/messages',
      headers: {
        authorization: `Bearer ${jwt}`,
      },
    });
    assertion.assert200JSON(response, !process.env.TEST);
  });

  beforeEach(async () => {
    await truncate(di.db);
  });

  after(async () => {
    await di.db.destroy();
  });
});
