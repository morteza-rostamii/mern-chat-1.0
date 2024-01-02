import { create } from 'zustand'
import { TOKEN, USER } from '../consts/const';
import api from '../routes/api';
import { TAddFriendInput, TSearchUsersInput } from '../types/types';

const useAuthStore = create<any>((set: any, get: any) => ({
  authUser: localStorage.getItem(USER) ? JSON.parse(localStorage.getItem(USER) as string) : null,
  currRecipient: null,
  users: [],
  chats: [],
  currentChat: null,
  onlines: [],

  setOnlineClients(onlines: any[]) {
    set((s:any) => ({
      ...s,
      onlines: onlines,
    }))
  },

  setCurrRecipient(recipient: string) {
    set((s: any) => ({...s, currRecipient: recipient}));
  },

  setAuthUser(authUser: any) {
    set((s:any) => ({...s, authUser: authUser}));
  },

  // search users
  async searchUsersAct(payload: TSearchUsersInput) {

    try {

      const response = await api.searchUsers(payload);
      const {data}: any = response;

      console.log('__09', data);
      if (data?.users?.length) {
        set((s:any) => ({
          ...s,
          users: data.users,
        }));
      } else {
        set((s:any) => ({
          ...s, 
          users: [],
        }));
      }

    } catch(error:any) {
      console.log(error?.message || error);
    }
  },

  async addFriendAct(payload: TAddFriendInput) {

    try {

      const response = await api.addFriend(payload);
      const {data}: any = response;

      console.log(response);
      if (data?.success) {
        /* set((s:any) => ({
          ...s,
          users: data.users,
        })); */
        console.log(data);
      }

    } catch(error:any) {
      console.log(error?.message || error);
    }
  },

  // logout
  async logoutAct(callback: () => void) {
    try {
      // hit backend logout route to remove the http cookie
      const response = await api.logout();
      const {data} = response; 
  
      if (data?.success) {
        // remove user from local storage
        localStorage.removeItem(USER);
        
        // redirect to login page
        callback();
      } 

    } catch(error:any) {
      console.log(error?.messsge || error);
    }
  },
}))

const unsub = useAuthStore.subscribe((s: any) => console.log(`useAuthStore has been updated!!`, s));

export default useAuthStore