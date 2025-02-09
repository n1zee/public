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

describe('admin.categories', async () => {
  it('list', async () => {
    const {
      admin,
      jwt,
    } = await registerAdmin(di, arrange);

    const [category_parent] = await di.services.CategoryService.insert(di, {
      title: JSON.stringify({
        en: 'en',
        ru: 'ru',
      }),
      active: true,
    });
    const [category] = await di.services.CategoryService.insert(di, {
      title: JSON.stringify({
        en: 'en',
        ru: 'ru',
      }),
      active: true,
      pid: category_parent.id,
    });

    const fastify = await app(di);
    const response = await fastify.inject({
      method: 'GET',
      query: {
        id: category.id,
        order: 'TITLE_EN',
      },
      url: '/api/admin/categories',
      headers: {
        authorization: `Bearer ${jwt}`,
      },
    });
    assertion.assert200JSON(response, !process.env.TEST);
  });

  it('create', async () => {
    const {
      admin,
      jwt,
    } = await registerAdmin(di, arrange);

    const [category_parent] = await di.services.CategoryService.insert(di, {
      title: JSON.stringify({
        en: 'en',
        ru: 'ru',
      }),
      active: true,
    });
    const [category] = await di.services.CategoryService.insert(di, {
      title: JSON.stringify({
        en: 'en',
        ru: 'ru',
      }),
      active: true,
      pid: category_parent.id,
    });

    const fastify = await app(di);
    const response = await fastify.inject({
      method: 'POST',
      payload: {
        title: {
          en: 'en',
          ru: 'ru',
        },
        pid: category_parent.id,
        thumbnail: '//',
      },
      url: '/api/admin/categories',
      headers: {
        authorization: `Bearer ${jwt}`,
      },
    });
    assertion.assert200JSON(response, !process.env.TEST);
  });

  it('update', async () => {
    const {
      admin,
      jwt,
    } = await registerAdmin(di, arrange);

    const [category_parent] = await di.services.CategoryService.insert(di, {
      title: JSON.stringify({
        en: 'en',
        ru: 'ru',
      }),
      active: true,
    });
    const [category] = await di.services.CategoryService.insert(di, {
      title: JSON.stringify({
        en: 'en',
        ru: 'ru',
      }),
      active: true,
      pid: category_parent.id,
    });

    const fastify = await app(di);
    const response = await fastify.inject({
      method: 'POST',
      payload: {
        title: {
          en: 'en2',
          ru: 'ru2',
        },
        thumbnail: '//',
      },
      url: `/api/admin/categories/${category.id}`,
      headers: {
        authorization: `Bearer ${jwt}`,
      },
    });
    assertion.assert200JSON(response, !process.env.TEST);
  });

  it('delete', async () => {
    const {
      admin,
      jwt,
    } = await registerAdmin(di, arrange);

    const [category_parent] = await di.services.CategoryService.insert(di, {
      title: JSON.stringify({
        en: 'en',
        ru: 'ru',
      }),
      active: true,
    });
    const [category] = await di.services.CategoryService.insert(di, {
      title: JSON.stringify({
        en: 'en',
        ru: 'ru',
      }),
      active: true,
      pid: category_parent.id,
    });

    const fastify = await app(di);
    const response = await fastify.inject({
      method: 'POST',
      payload: {
        ids: [category_parent.id],
      },
      url: `/api/admin/categories/delete`,
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
