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

describe('UploaderTest', async () => {
  it('sign', async () => {
    const {
      user,
      jwt,
    } = await registerUser(di, arrange);

    const fastify = app(di);
    const response = await fastify.inject({
      method: 'POST',
      payload: {
        type: 'IMAGE',
        folder: 'cards',
      },
      url: '/api/twa/uploader',
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
