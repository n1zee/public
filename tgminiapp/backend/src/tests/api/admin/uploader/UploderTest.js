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

describe('admin.uploader', async () => {
  it('sign', async () => {
    const {
      admin,
      jwt,
    } = await registerAdmin(di, arrange);

    const fastify = app(di);
    const response = await fastify.inject({
      method: 'POST',
      payload: {
        type: 'IMAGE',
        folder: 'cards',
      },
      url: '/api/admin/uploader',
      headers: {
        authorization: `Bearer ${jwt}`,
      },
    });
    assertion.assert200JSON(response, !process.env.TEST);
  });

  it('upload', async () => {
    const {
      admin,
      jwt,
    } = await registerAdmin(di, arrange);

    const form = new FormData();
    form.append('file', di.libs.fs.createReadStream(`${__dirname}/../../../mock/file.jpg`));
    form.append('folder', 'cards');
    form.append('type', 'IMAGE');

    const fastify = await app(di);
    const response = await fastify.inject({
      method: 'POST',
      payload: form,
      url: '/api/admin/uploader/upload',
      headers: Object.assign(form.getHeaders(), {
        'Authorization': `Bearer ${jwt}`,
      }),
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
