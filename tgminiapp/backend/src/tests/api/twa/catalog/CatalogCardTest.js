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
  it('cards.get', async () => {
    const {
      user,
      jwt,
    } = await registerUser(di, arrange);

    await di.services.UserService.updateById(di, user.id, {
      avatar: '//',
      username: '//',
    });

    const [category_parent] = await di.services.CategoryService.insert(di, {
      title: {
        en: 'en',
        ru: 'ru',
      },
      active: true,
    });
    const [category] = await di.services.CategoryService.insert(di, {
      title: {
        en: 'en',
        ru: 'ru',
      },
      active: true,
      pid: category_parent.id,
    });

    const [card] = await di.services.CardService.insert(di, {
      user_id: user.id,
      category_id: JSON.stringify([category.id]),
      status: di.services.CardService.STATUS.PUBLISH,
      published_at: new Date(),
      payload_url: '//',
      socials: JSON.stringify([{
        domain: 'vk.com',
        url: '//',
      },
      ]),
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
      url: `/api/twa/catalog/cards/${card.id}`,
      headers: {
        authorization: `Bearer ${jwt}`,
      },
    });
    assertion.assert200JSON(response, !process.env.TEST);
  });

  it('cards.list', async () => {
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
    const [category1] = await di.services.CategoryService.insert(di, {
      title: JSON.stringify({
        en: 'en',
        ru: 'ru',
      }),
      active: true,
      pid: category_parent.id,
    });
    const [category2] = await di.services.CategoryService.insert(di, {
      title: JSON.stringify({
        en: 'en',
        ru: 'ru',
      }),
      active: true,
      pid: category_parent.id,
    });

    const [card] = await di.services.CardService.insert(di, {
      user_id: user.id,
      category_id: JSON.stringify([category1.id]),
      status: di.services.CardService.STATUS.PUBLISH,
      currency: 'USDT',
      title: JSON.stringify({
        en: 'en',
        ru: 'ru',
      }),
      medias: JSON.stringify([{
        type: 'IMAGE',
        url: '//',
      }]),
    });

    const [card2] = await di.services.CardService.insert(di, {
      user_id: user.id,
      category_id: JSON.stringify([category2.id]),
      status: di.services.CardService.STATUS.PUBLISH,
      currency: 'USDT',
      title: JSON.stringify({
        en: 'en',
        ru: 'ru',
      }),
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
      query: {
        search: 'en',
        category_id: [category1.id, category2.id],
        user_id: [user.id],
        currency: ['USDT'],
        order: 'RANDOM',
      },
      url: `/api/twa/catalog/cards`,
      headers: {
        authorization: `Bearer ${jwt}`,
      },
    });
    assertion.assert200JSON(response, !process.env.TEST);
  });

  it('cards.similar', async () => {
    const {
      user,
      jwt,
    } = await registerUser(di, arrange);

    await di.services.UserService.updateById(di, user.id, {
      avatar: '//',
      username: '//',
    });

    const [category_parent] = await di.services.CategoryService.insert(di, {
      title: {
        en: 'en',
        ru: 'ru',
      },
      active: true,
    });
    const [category] = await di.services.CategoryService.insert(di, {
      title: {
        en: 'en',
        ru: 'ru',
      },
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

    const [cardSimilar] = await di.services.CardService.insert(di, {
      user_id: user.id,
      category_id: JSON.stringify([category.id]),
      status: di.services.CardService.STATUS.PUBLISH,
      currency: 'USDT',
      title: {
        en: 'en',
        ru: 'ru',
      },
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
      query: {
        card_id: card.id,
      },
      url: `/api/twa/catalog/cards/similar`,
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
