exports.up = function (knex) {
    return knex.raw(`
      CREATE TABLE "users"
      (
          id                 SERIAL PRIMARY KEY,
          tg_uuid            bigint      NOT NULL,
          tg_username        text,
          username           text,
          coins              int         NOT NULL DEFAULT 0,
          claim_coins_start  timestamptz,
          avatar             text,
          banner             text,
          bio                text,
          tg_data            jsonb,
          ref1_id            int,
          ref2_id            int,
          ref1_count         int         NOT NULL DEFAULT 0,
          ref2_count         int         NOT NULL DEFAULT 0,
          ref_claim_coins    int         NOT NULL DEFAULT 0,
          ref_claim_coins_at timestamptz,
          ref1_coins         int         NOT NULL DEFAULT 0,
          ref2_coins         int         NOT NULL DEFAULT 0,
          ref1_claim_at      timestamptz,
          tg_state           jsonb,
          online_at          timestamptz,
          created_at         timestamptz NOT NULL DEFAULT now(),
          UNIQUE (tg_uuid)
      );
  `);
};

exports.down = function (knex) {};
