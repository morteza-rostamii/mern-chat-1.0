
export const JWT_TOKEN_COOKIE_NAME = 'token';

export const PRODUCTION = 'production';
export const DEVELOPMENT = 'development';

export const statusCodes = {
  badRequest: 400,
  success: 200,
  successResource: 201,
  forbidden: 403,
};

// socket event
export const CLIENT_SENT_MSG = 'client-sent-msg';
export const SERVER_SENT_MSG = 'server-sent-msg';
export const EVENT_ONLINE_CLIENTS = 'event-online-clients';

export const CLIENT_URL = process.env.NODE_ENV === DEVELOPMENT ? process.env.CLIENT_URL_DEV || 'http://localhost:3002' : process.env.CLIENT_VPS_URL;