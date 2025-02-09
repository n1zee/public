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

describe('BannerTest', async () => {
  it('banners.list', async () => {
    const {
      user,
      jwt,
    } = await registerUser(di, arrange);

    await di.services.UserService.updateById(di, user.id, {
      avatar: '//',
      username: '//',
    });

    const [category_parent] = await di.services.CategoryService.insert(di, {
      title: 'parent',
      active: true,
    });
    const [category] = await di.services.CategoryService.insert(di, {
      title: 'cat',
      active: true,
      pid: category_parent.id,
    });

    const [card] = await di.services.CardService.insert(di, {
      user_id: user.id,
      category_id: category.id,
      status: di.services.CardService.STATUS.PUBLISH,
      currency: 'USDT',
      medias: JSON.stringify([{
        type: 'IMAGE',
        url: '//',
      }]),
    });

    await di.services.BannerService.insert(di, {
      page: di.services.BannerService.PAGE.CATALOG,
      card_id: card.id,
    });

    await di.services.BannerService.insert(di, {
      page: di.services.BannerService.PAGE.CATALOG,
      priority: -1,
      media: JSON.stringify([{
        type: 'IMAGE',
        url: '//',
      }][0]),
    });

    const fastify = app(di);
    const response = await fastify.inject({
      method: 'GET',
      query: {
        page: di.services.BannerService.PAGE.CATALOG,
      },
      url: `/api/twa/banners`,
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
