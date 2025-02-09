exports.up = function (knex) {
    return knex.raw(`
      CREATE TABLE "banners"
      (
          id                SERIAL PRIMARY KEY,
          page              varchar(50) NOT NULL,
          card_id           int,
          title             text,
          description_short text,
          media             jsonb,
          payload_url       text,
          priority          int         NOT NULL DEFAULT 0,
          created_at        timestamptz NOT NULL DEFAULT now(),
          deleted_at        timestamptz
      );
  `);
};

exports.down = function (knex) {};
