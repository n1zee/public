const crypto = require('crypto');

function TgWebAppParse(token, uri) {
  const url = new URL(uri);
  const searchParams = new URLSearchParams(url.hash.substring(1));
  const tgWebAppData = new URLSearchParams(searchParams.get('tgWebAppData'));

  const hash = tgWebAppData.get('hash');
  tgWebAppData.delete('hash');
  tgWebAppData.sort();
  const check = [];
  tgWebAppData.forEach((k, v) => {
    check.push(`${v}=${k}`);
  });
  const checkString = check.join('\n');
  const secretKey = crypto
    .createHmac('sha256', 'WebAppData')
    .update(token)
    .digest();

  const computedHash = crypto
    .createHmac('sha256', secretKey)
    .update(checkString)
    .digest('hex');

  let user = null;
  try {
    user = JSON.parse(tgWebAppData.get('user'));
  } catch (e) {

  }
  return {
    user,
    tgWebAppStartParam: url.searchParams.get('tgWebAppStartParam') || null,
    valid: computedHash === hash,
  };
}

module.exports = TgWebAppParse;
