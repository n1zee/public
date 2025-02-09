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

describe('ProfileTest', async () => {
  it('info', async () => {
    const {
      user,
      jwt,
    } = await registerUser(di, arrange);

    await di.services.UserService.updateById(di, user.id, {
      avatar: '//',
      banner: '//',
      bio: 'bio',
      username: 'zzz',
    });

    const fastify = app(di);
    const response = await fastify.inject({
      method: 'GET',
      url: `/api/twa/profile/${user.id}`,
      headers: {
        authorization: `Bearer ${jwt}`,
      },
    });
    assertion.assert200JSON(response, !process.env.TEST);
  });

  it('update', async () => {
    const {
      user,
      jwt,
    } = await registerUser(di, arrange);

    const fastify = app(di);
    const response = await fastify.inject({
      method: 'POST',
      payload: {
        avatar: '//',
        banner: '//',
        bio: 'bio',
        username: 'zzz',
        email: 'zz@zz.cc',
        lang: 'en',
      },
      url: '/api/twa/profile',
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
