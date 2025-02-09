const AbstractService = require('./_AbstractService');

class AdminService extends AbstractService {
  static get table() {
    return 'admins';
  }

  static async getIdentity(di, id) {
    const admin = await di.services.AdminService.query(di)
      .where('id', id)
      .whereNull('deleted_at');
    return admin;
  }
}

module.exports = AdminService;
