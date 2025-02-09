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

describe('cardTest', async () => {
  it('create', async () => {
    const {
      user,
      jwt,
    } = await registerUser(di, arrange);

    await di.services.UserService.updateById(di, user.id, {
      coins: 100000,
    });

    const fastify = app(di);
    const response = await fastify.inject({
      method: 'POST',
      url: '/api/twa/cards',
      headers: {
        authorization: `Bearer ${jwt}`,
      },
    });
    assertion.assert200JSON(response, !process.env.TEST);
  });

  it('update.draft', async () => {
    const {
      user,
      jwt,
    } = await registerUser(di, arrange);

    const [category] = await di.services.CategoryService.insert(di, {
      title: {
        en: 'en',
        ru: 'ru',
      },
      active: true,
    });

    const [card] = await di.services.CardService.insert(di, {
      user_id: user.id,
      status: di.services.CardService.STATUS.DRAFT,
    });

    const fastify = app(di);
    const response = await fastify.inject({
      method: 'POST',
      payload: {
        category_id: [category.id],
        title: {
          en: 'en',
          ru: 'ru',
        },
        description_short: {
          en: 'en',
          ru: 'ru',
        },
        description_full: {
          en: 'en',
          ru: 'ru',
        },
        currency: 'TON',
        price_value: 100.12,
        price_type: 'PRICE',
        payload_url: '//',
        medias: [
          {
            type: 'IMAGE',
            url: '//',
          },
        ],
        socials: [
          {
            domain: 't.me',
            url: '//',
          },
        ],
      },
      url: `/api/twa/cards/${card.id}`,
      headers: {
        authorization: `Bearer ${jwt}`,
      },
    });
    assertion.assert200JSON(response, !process.env.TEST);
  });

  it('update.status', async () => {
    const {
      user,
      jwt,
    } = await registerUser(di, arrange);

    di.services.NotificationService.notifyCardModeration = async () => {
    };

    const [card] = await di.services.CardService.insert(di, {
      user_id: user.id,
      status: di.services.CardService.STATUS.DRAFT,
      title: {
        en: 'en',
        ru: 'ru',
      },
    });

    const fastify = app(di);
    const response = await fastify.inject({
      method: 'POST',
      payload: {
        status: di.services.CardService.STATUS.MODERATE,
      },
      url: `/api/twa/cards/${card.id}/status`,
      headers: {
        authorization: `Bearer ${jwt}`,
      },
    });
    assertion.assert200JSON(response, !process.env.TEST);
  });

  it('get', async () => {
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
      status: di.services.CardService.STATUS.DRAFT,
      medias: JSON.stringify([{
        type: 'IMAGE',
        url: '//',
      }]),
      socials: JSON.stringify([{
        domain: 'vk.com',
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
      url: `/api/twa/cards/${card.id}`,
      headers: {
        authorization: `Bearer ${jwt}`,
      },
    });
    assertion.assert200JSON(response, !process.env.TEST);
  });

  it('list', async () => {
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
      status: di.services.CardService.STATUS.DRAFT,
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
      url: `/api/twa/cards`,
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
