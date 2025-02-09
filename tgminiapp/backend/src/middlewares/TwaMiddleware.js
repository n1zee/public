async function TwaMiddleware(di, request) {
  const bearer = request.headers.authorization;
  let auth = null;
  let identity = null;
  if (bearer) {
    const jwt = bearer.replace('Bearer ', '');
    if (jwt) {
      try {
        const payload = di.libs.Jwt.verify({
          secret: di.env.APP_SECRET,
          jwt,
        });
        if (payload?.type === 'TWA') {
          auth = {
            id: payload.id,
            type: payload.type,
            jwt,
          };
        }
      } catch {
        //
      }
    }
  }
  if (auth?.id) {
    identity = await di.services.UserService.getIdentity(di, auth.id);
  }
  request.auth = auth;
  request.user = identity;

  if (!request.user) {
    throw new di.errors.HttpError(401, 'AUTH');
  }
}

module.exports = TwaMiddleware;
