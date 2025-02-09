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

describe('categoryTest', async () => {
  it('list', async () => {
    const {
      user,
      jwt,
    } = await registerUser(di, arrange);

    await di.services.CategoryService.insert(di, {
      title: JSON.stringify({
        en: 'en',
        ru: 'ru',
      }),
      active: true,
    });

    const fastify = app(di);
    const response = await fastify.inject({
      method: 'GET',
      url: '/api/twa/catalog/categories',
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
