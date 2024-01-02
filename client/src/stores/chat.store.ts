import { create } from 'zustand'
import type{ TGetChatsPayload, TMessage } from '../types/types';
import { faker } from '@faker-js/faker';
import api from '../routes/api';
import useAuthStore from './auth.store';
import { CLIENT_SENT_MSG } from '../consts/const';

const useChatStore = create<any>((set:any, get:any) => ({
  chats: [],
  activeChatId: '',
  chatContainerRef: null,
  loading: false,

  setLoading(bool: boolean) {
    set((s:any) => ({...s, loading: bool}));
  },

  setChatContainerRef(ref: any) {
    set((s:any) => ({...s, chatContainerRef: ref}));
  },

  scrollDownChatContainerAct() {
    if (!get().chatContainerRef?.current) return;
    get().chatContainerRef.current.scrollTop = get().chatContainerRef?.current.scrollHeight;
  },

  // set the active chat
  setActiveChatAct(chatId: string) {
    set((s:any) => ({
      ...s,
      activeChatId: chatId,
    }));
  },

  // add new message to it's chat
  addMessageToChatAct(message: any) {
    console.log('--- set message to chat.messages');
    // find the chat:
    const chat: any = get().chats.find((chat:any) => {
      return chat.id === message.chatId;
    });

    console.log(chat);
    // add message to chat.message
    chat.messages = [...chat.messages, message];

    const chats: any[] = get().chats.filter((ch:any) => ch.id !== chat.id);

    console.log('chats;;' , chats);

    set((s: any) => ({
      ...s,
      chats: [...chats, chat],
    }));
  },
  
  async fetchChatsAct(payload: TGetChatsPayload) {
    try {
      const response = await api.getChats(payload);
      const {data}: any = response;

      if (data?.success) {
        set((s:any) => ({
          ...s,
          chats: data.chats,
        }));
      }

    } catch(error:any) {
      console.log(error?.message || error);
    }
  },
}));

const unsub = useChatStore.subscribe((s: any) => console.log(`useChatStore has been updated!!`, s));

export default useChatStore