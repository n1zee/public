exports.up = function (knex) {
    return knex.raw(`
      CREATE TABLE "ai_messages"
      (
          id         SERIAL PRIMARY KEY,
          user_id    int         NOT NULL,
          card_id    int,
          role       varchar(20) NOT NULL,
          message    text,
          created_at timestamptz NOT NULL DEFAULT now()
      );
  `);
};

exports.down = function (knex) {};
