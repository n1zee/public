exports.up = function (knex) {
    return knex.raw(`
      CREATE TABLE "configs"
      (
          key   text PRIMARY KEY,
          value jsonb
      );
  `);
};

exports.down = function (knex) {};
