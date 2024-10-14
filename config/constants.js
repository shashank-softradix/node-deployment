const RESPONSE_CODES = {
    GET: 200,
    POST: 201,
    DELETE: 204,
    PUT: 204,
    NOT_FOUND: 404,
    SERVER_ERROR: 500,
    UNAUTHORIZED: 401,
    BAD_REQUEST: 400,
  };
  
  const ROLES = {
    ADMIN: 1,
    USER: 2
  };

  module.exports = {RESPONSE_CODES,ROLES}