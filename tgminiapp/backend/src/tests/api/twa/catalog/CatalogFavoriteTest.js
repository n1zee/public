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

describe('CatalogCardTest', async () => {
  it('favorites.list', async () => {
    const {
      user,
      jwt,
    } = await registerUser(di, arrange);

    await di.services.UserService.updateById(di, user.id, {
      avatar: '//',
      username: '//',
    });

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

    const [card] = await di.services.CardService.insert(di, {
      user_id: user.id,
      category_id: JSON.stringify([category.id]),
      status: di.services.CardService.STATUS.PUBLISH,
      currency: 'USDT',
      medias: JSON.stringify([{
        type: 'IMAGE',
        url: '//',
      }]),
    });

    await di.services.UserFavoriteService.insert(di, {
      user_id: user.id,
      card_id: card.id,
    });

    const fastify = app(di);
    const response = await fastify.inject({
      method: 'GET',
      url: `/api/twa/catalog/favorites`,
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
