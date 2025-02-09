function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function truncate(db) {
  const query = await db.raw('SELECT tablename FROM pg_catalog.pg_tables WHERE schemaname = \'public\' ');
  const promises = [];
  query.rows.forEach((q) => {
    if (q.tablename.indexOf('migration') === -1) {
      promises.push(
        db.truncate(q.tablename),
      );
      promises.push(
        db.raw(`ALTER SEQUENCE IF EXISTS ${q.tablename}_id_seq RESTART WITH ${getRandomInt(1, 1e6)}`),
      );
    }
  });
  await Promise.all(promises);
}

module.exports = truncate;
