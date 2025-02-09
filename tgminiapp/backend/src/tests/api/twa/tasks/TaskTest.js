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

describe('TaskTest', async () => {
  it('list', async () => {
    const {
      user,
      jwt,
    } = await registerUser(di, arrange);

    const [task] = await di.services.TaskService.insert(di, {
      type: di.services.TaskService.TYPE.LINK,
      source: di.services.TaskService.SOURCE.INTERNAL,
      active: true,
      executions_max: 100,
      executions: 10,
      payload: {
        url: '//',
      },
    });

    const fastify = app(di);
    const response = await fastify.inject({
      method: 'GET',
      url: '/api/twa/earn/tasks',
      headers: {
        authorization: `Bearer ${jwt}`,
      },
    });
    assertion.assert200JSON(response, !process.env.TEST);
  });

  it('execute', async () => {
    const {
      user,
      jwt,
    } = await registerUser(di, arrange);

    const [task] = await di.services.TaskService.insert(di, {
      type: di.services.TaskService.TYPE.LINK,
      source: di.services.TaskService.SOURCE.INTERNAL,
      active: true,
      coins: 111,
      executions_max: 100,
      executions: 10,
      payload: {
        url: '//',
      },
    });

    const fastify = app(di);
    const response = await fastify.inject({
      method: 'POST',
      url: `/api/twa/earn/tasks/${task.id}`,
      headers: {
        authorization: `Bearer ${jwt}`,
      },
    });
    assertion.assert200JSON(response, !process.env.TEST);
  });

  it('task.ref', async () => {
    const [ref2] = await di.services.UserService.insert(di, {
      tg_uuid: '333',
      tg_username: arrange.tg_username,
      tg_data: JSON.stringify(arrange.tg_data),
    });
    const [ref] = await di.services.UserService.insert(di, {
      tg_uuid: '222',
      tg_username: arrange.tg_username,
      tg_data: JSON.stringify(arrange.tg_data),
      ref1_id: ref2.id,
    });

    await di.services.TaskService.insert(di, {
      type: di.services.TaskService.TYPE.REF,
      source: di.services.TaskService.SOURCE.INTERNAL,
      active: true,
      coins: 199,
      payload: {
        refs: 1,
      },
    });

    const fastify = await app(di);
    const response = await fastify.inject({
      method: 'POST',
      url: '/api/twa/auth',
      payload: {
        uri: `https://dev.unlima.com/?tgWebAppStartParam=ref${ref.tg_uuid}#tgWebAppData=user%3D%257B%2522id%2522%253A${arrange.tg_uuid}%252C%2522first_name%2522%253A%2522%25D0%2595%25D0%25B2%25D0%25B3%25D0%25B5%25D0%25BD%25D0%25B8%25D0%25B9%2522%252C%2522last_name%2522%253A%2522%2522%252C%2522username%2522%253A%2522ncsft%2522%252C%2522language_code%2522%253A%2522ru%2522%252C%2522allows_write_to_pm%2522%253Atrue%257D%26chat_instance%3D-8764875909327905403%26chat_type%3Dprivate%26start_param%3D%26auth_date%3D1713956419%26hash%3Ddd86ea5291ade1ae2c65f483e449b80c6b55785c3c281c439d1eba7622920011&tgWebAppVersion=7.2&tgWebAppPlatform=web&tgWebAppThemeParams=%7B"bg_color"%3A"%23ffffff"%2C"button_color"%3A"%233390ec"%2C"button_text_color"%3A"%23ffffff"%2C"hint_color"%3A"%23707579"%2C"link_color"%3A"%2300488f"%2C"secondary_bg_color"%3A"%23f4f4f5"%2C"text_color"%3A"%23000000"%2C"header_bg_color"%3A"%23ffffff"%2C"accent_text_color"%3A"%233390ec"%2C"section_bg_color"%3A"%23ffffff"%2C"section_header_text_color"%3A"%233390ec"%2C"subtitle_text_color"%3A"%23707579"%2C"destructive_text_color"%3A"%23df3f40"%7D`,
      },
      headers: {
        // authorization: `Bearer ${jwt}`,
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
