
// side tabs
export const PROFILE = 'profile';
export const CHATS = 'chats';
export const FRIENDS = 'friends';
export const SEARCH = 'search';

export const ADD = 'add';
export const PENDING = 'pending';
export const ADDED = 'added';

export const SIGNUP = 'signup';
export const LOGIN = 'login';

export const USER = 'auth-user';

export const TOKEN = 'token';

//routes
export const DASHBOARD_ROUTE = '/dashboard';
export const REGISTER_ROUTE = '/register';
export const LOGIN_ROUTE = '/login';

// socket events
//export const CLIENT_SENT_MSG = 'client-sent-msg';
//export const SERVER_SENT_MSG = 'server-sent-msg';
//export const EVENT_ONLINE_CLIENTS = 'event-online-clients';
//export const SEND_MSG_TO_RECIPIENT = 'send-msg-to-recipient';

export const NEW_MSG = 'new-message';

export const DEVELOPMENT = 'development';
export const PRODUCTION = 'production';

export const SOCKET_URL = import.meta.env.VITE_NODE_ENV === DEVELOPMENT ? import.meta.env.VITE_SOCK_URL_DEV || 'ws://localhost:3000' : import.meta.env.VITE_SOCK_URL_PRO;