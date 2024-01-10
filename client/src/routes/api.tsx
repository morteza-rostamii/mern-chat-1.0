import axios from "axios";
import { TAddFriendInput, TGetChatsPayload, TLoginResponse, TRegisterFormData, TRegisterResponse, TSearchUsersInput } from "../types/types";
import { DEVELOPMENT, TOKEN, USER } from "../consts/const";

/* const Axios = axios.create({
  baseURL: 'http://localhost:3000/',
  timeout: 1000,
  headers: {
    'X-Custom-Header': 'foobar',
  },
}); */

// allow server to set cookies
axios.defaults.withCredentials = true;

const BASE = import.meta.env.VITE_NODE_ENV === DEVELOPMENT ? import.meta.env.VITE_API_URL || 'http://localhost:3001/' : import.meta.env.VITE_API_URL_PRO;

const api = {
  
  // POST: /auth/register
  async register(payload: TRegisterFormData): Promise<TRegisterResponse | null> {

    try {
      const response: any = await axios.post(
        `${BASE}auth/register`,
        payload,
      );
      
      const {data} = response;

      if (data.success) {
        return data;
      } else {
        throw new Error(data.msg);
      }

    } catch(error: any) {
      console.log(error || error?.message);
      return null;
    }
  },

  // POST: /auth/login =: authenticate the magic-link
  async login(token: string, callback: (data:any) => void): Promise<TLoginResponse | null> {
    try {
      const response = await axios.post(
        `${BASE}auth/login`, 
        {token},
        {
          // let the server to set cookies
          //withCredentials: true,
        }
      )

      const {data} = response;

      console.log(response.data.success)
      if (data.success) {
        callback(data);
        console.log('----', data)
        return data;
      } else {
        throw new Error(data.msg);
      }

    } catch(error: any) {
      console.log(error || error?.message);
      //console.log(error?.response?.data);
      return null;
    }
  },

  // POST: /auth/check-token
  async checkExpiry() {
    try {
      const response = await axios.post(
        `${BASE}auth/check-token`,
        {},
      );
  
      const {data} = response;
  
      if (data.expiry) {
        // remove auth-user from localStorage
        localStorage.removeItem(USER);
      }
    } catch(error:any) {
      console.log(error?.message || error);
    }
  },

  // POST: /auth/search-users
  async searchUsers(payload: TSearchUsersInput) {

    return await axios.post(
      `${BASE}auth/search-users`,
      payload,
    )
  },

  // POST: /auth/add-friend
  async addFriend(payload: TAddFriendInput) {
    return await axios.post(
      `${BASE}auth/add-friend`,
      payload,
    )
  },

  // POST: /auth/friends
  async getChats(payload: TGetChatsPayload) {
    return await axios.post(
      `${BASE}auth/friends`,
      payload,
    )
  },

  // Messages

  // POST: /messages
  async createMsg(payload: any) {
    return await axios.post(
      `${BASE}messages`,
      payload,
    );
  },

  // POST: /auth/logout
  async logout() {
    return axios.post(
      `${BASE}auth/logout`,
    );
  },
}

export default api