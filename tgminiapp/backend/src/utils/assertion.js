const assert = require('assert');

function assert200JSON(response, log) {
  const payload = JSON.parse(response.payload);
  if (log) {
    // eslint-disable-next-line no-console
    console.dir(payload, { depth: null });
  }
  assert.strictEqual(response.statusCode, 200);
  assert.strictEqual(response.headers['content-type'], 'application/json; charset=utf-8');
}

function assert401JSON(response, log) {
  const payload = JSON.parse(response.payload);
  if (log) {
    // eslint-disable-next-line no-console
    console.dir(payload, { depth: null });
  }
  assert.strictEqual(response.statusCode, 401);
  assert.strictEqual(response.headers['content-type'], 'application/json; charset=utf-8');
}

module.exports.assert200JSON = assert200JSON;
module.exports.assert401JSON = assert401JSON;
