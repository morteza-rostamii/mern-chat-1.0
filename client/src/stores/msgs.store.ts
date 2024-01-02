import { create } from 'zustand'
import type{ TMessage } from '../types/types';
import { faker } from '@faker-js/faker';
import api from '../routes/api';
import useAuthStore from './auth.store';
import { CLIENT_SENT_MSG } from '../consts/const';
import useChatStore from './chat.store';
import toast from 'react-hot-toast';

const toastMsgSuccess = () => toast.success('message was sent', {
  duration: 4000,
});

const useMsgStore = create<any>((set:any, get:any) => ({
  // messages inside direct
  directMessages: [],

  // socket.io instance
  socketio: null,

  setSocket(socket: any) {
    set((s:any) => ({...s, socketio: socket}));
  },

  addDirMessageAct(message: any) {
    set((s:any) => ({
      ...s,
      directMessages: [
        ...s.directMessages,
        message,
      ]
    }));
  },
  
  async sendMessageAct(payload: any) {
    try {

      /* for (const entry of payload.entries()) {
        console.log(entry[0], entry[1]);
      } */

      // formData to js_object
      const payloadObj: any = {};

      for (const [key, value] of payload.entries()) {
        payloadObj[key] = value;
      }

      // object to json_str
      const strPayload = JSON.stringify(payloadObj);
      
      //console.log(strPayload)
      // send message through socket
      //console.log(get().socketio)
      get().socketio.emit(
        CLIENT_SENT_MSG, 
        strPayload, 
        // callback: after socket success
        (message: any) => {
        //console.log('message was sent!! ', message);
        useChatStore.getState().addMessageToChatAct(message);
        setTimeout(() => {
          useChatStore.getState().scrollDownChatContainerAct();
        }, 500);

        toastMsgSuccess();
      });

      //const {data} = response;

      /* if (data?.success) {
        console.log(data);
      } */

    } catch(error: any) {
      console.log(error?.message, error);
    }
  },

  /* getMessages: async () => {
    const messageCreationPromises = Array.from({ length: 40 }, () => createMessage());
    const messages = await Promise.all(messageCreationPromises);
    set((s:any) => ({...s, directMessages: messages}));
  } */
}));

const unsub = useMsgStore.subscribe((s: any) => console.log(`useMsgStore has been updated!!`, s));

export default useMsgStore