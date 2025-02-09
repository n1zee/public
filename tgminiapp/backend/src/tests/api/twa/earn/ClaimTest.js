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

describe('earn.claim.test', async () => {
  it('claim.start', async () => {
    const {
      user,
      jwt,
    } = await registerUser(di, arrange);

    const fastify = app(di);
    const response = await fastify.inject({
      method: 'POST',
      url: '/api/twa/earn/claim/start',
      headers: {
        authorization: `Bearer ${jwt}`,
      },
    });
    assertion.assert200JSON(response, !process.env.TEST);
  });

  it('claim.take', async () => {
    const {
      user,
      jwt,
    } = await registerUser(di, arrange);

    const [ref1] = await di.services.UserService.insert(di, {
      tg_uuid: '555',
      tg_username: arrange.tg_username,
      tg_data: JSON.stringify(arrange.tg_data),
    });
    const [ref2] = await di.services.UserService.insert(di, {
      tg_uuid: '666',
      tg_username: arrange.tg_username,
      tg_data: JSON.stringify(arrange.tg_data),
    });

    await di.services.UserService.updateById(di, user.id, {
      claim_coins_start: new Date(Date.now() - 3600 * 25 * 1000),
      ref1_id: ref1.id,
      ref2_id: ref2.id,
    });

    const fastify = app(di);
    const response = await fastify.inject({
      method: 'POST',
      url: '/api/twa/earn/claim/take',
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
