const AbstractService = require('./_AbstractService');

class AiMessageService extends AbstractService {
  static get table() {
    return 'ai_messages';
  }

  static decorator(item) {
    if (!item) {
      return null;
    }
    return {
      id: item.id,
      user_id: item.user_id,
      card_id: item.card_id,
      role: item.role,
      message: item.message,
      created_at: item.created_at,
    };
  }
}

module.exports = AiMessageService;
