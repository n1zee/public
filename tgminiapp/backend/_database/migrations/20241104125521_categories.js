exports.up = function (knex) {
    return knex.raw(`
      CREATE TABLE "categories"
      (
          id         SERIAL PRIMARY KEY,
          title      text,
          thumbnail  text,
          position   int         NOT NULL DEFAULT 0,
          pid        int,
          active     boolean,
          created_at timestamptz NOT NULL DEFAULT now()
      );
  `);
};

exports.down = function (knex) {};
