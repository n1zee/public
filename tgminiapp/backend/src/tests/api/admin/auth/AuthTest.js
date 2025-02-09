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

const registerAdmin = require('../../../mock/registerAdmin');

const di = diI();

const arrange = {
  login: 'admin',
  password: 'admin123',
};

describe('admin.auth', async () => {
  it('me', async () => {
    const {
      admin,
      jwt,
    } = await registerAdmin(di, arrange);

    const fastify = await app(di);
    const response = await fastify.inject({
      method: 'GET',
      url: '/api/admin/auth',
      headers: {
        authorization: `Bearer ${jwt}`,
      },
    });
    assertion.assert200JSON(response, !process.env.TEST);
  });

  it('login', async () => {
    const {
      admin,
      jwt,
    } = await registerAdmin(di, arrange);

    const fastify = await app(di);
    const response = await fastify.inject({
      method: 'POST',
      payload: {
        login: arrange.login,
        password: arrange.password,
      },
      url: '/api/admin/auth',
      headers: {},
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
