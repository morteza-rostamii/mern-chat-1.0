import React, { useEffect, useRef, useState } from 'react'
import useMsgStore from '../../../stores/msgs.store'
import { TMessage } from '../../../types/types';
import DirMsgItem from './DirMsgItem';
import LoadScreen from '../../LoadScreen';
import useAuthStore from '../../../stores/auth.store';
import useChatStore from '../../../stores/chat.store';
import { HiArrowLongLeft } from "react-icons/hi2";
import { AnimatePresence } from 'framer-motion';

const ChatSection = () => {
  const {currRecipient} = useAuthStore();
  const {chats, activeChatId, setChatContainerRef} = useChatStore();
  const containerRef: any = useRef(null);

  useEffect(() => {
    if (!containerRef?.current) return;
    containerRef.current.scrollTop = containerRef.current.scrollHeight;

    // put chat containerRef into global state: 
    setChatContainerRef(containerRef);
  }, [activeChatId]);

  return (
    <section
    className='
    relative
    flex flex-col gap-3 h-full #bg-green-50
    p-4 pb-52 pt-24 overflow-y-scroll min-h-full
    '

    style={{
      //scrollBehavior: 'smooth',
    }}

    ref={containerRef}
    >
      <AnimatePresence>
        {
          chats && chats.length && activeChatId
          ?(
            chats.find((chat: any) => chat.id === activeChatId).messages
            .map((msg:TMessage,) => (
              <DirMsgItem
              key={msg.id}
              msg={msg}
              />
            ))
          ):(
            <div className='
            flex items-center gap-3 mx-auto bg-slate-50 p-4 rounded-md
            text-xl font-semibold text-gray-500'>
              <HiArrowLongLeft size={28}/>
              {'pick a chat'}
            </div>
          )
        }
      </AnimatePresence>
    </section>
  )
}

export default ChatSection