import { Avatar } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import getOneImage from '../../../utils/getImage'
import { FaCheck } from "react-icons/fa6";
import { FaCheckDouble } from "react-icons/fa6";
import useAuthStore from '../../../stores/auth.store';
import truncateText from '../../../utils/truncateText';
import { AvatarComponent } from 'avatar-initials';
import useChatStore from '../../../stores/chat.store';

const Chat = ({
  chat,
  handClick,
}: any) => {
  //const isSeen = true;
  //const hasMessage = true;
  const {authUser, onlines} = useAuthStore();
  const [isOnline, setIsOnline] = useState(false);
  const {activeChatId, } = useChatStore();
  const [chatRecipient, setchatRecipient] = useState<any>(null);
  const [lastMsg, setLastMsg] = useState('start a conversation...');

  useEffect(() => {
    const chatRecipient = chat.users.filter((user:any) => user.id !== authUser.id);
    setchatRecipient(chatRecipient[0]);
  }, []);

  useEffect(() => {
    const messages = chat.messages;

    if (messages.length) {
      const lstMessage = messages[messages.length - 1]?.text;
      setLastMsg(lstMessage);
    }
  }, [chat.messages]);

  useEffect(() => {
    if (chatRecipient) {
      const online = onlines.some((userId:any) => (chatRecipient as any).id === userId);
      console.log(online);
      setIsOnline(online);
    }
  }, [onlines, chatRecipient]);

  //console.log('---chat', chat.messages[chat.messages.length - 1])
  return (
    <div
    className={`
    ${chat.id === activeChatId ? 'bg-blue-100' : 'bg-white'}
    flex gap-6 border-b border-gray-200 p-4
    #justify-between cursor-pointer  
    rounded-md shadow-sm
    hover:bg-gray-50 transition-all delay-75
    `}
    
    onClick={() => handClick(chat)}
    >
      {/* avatar */}
      <div
      className='relative flex items-center'
      >
        <AvatarComponent
        classes="rounded-full"
        useGravatar={false}
        size={54}
        primarySource={chatRecipient?.avatar || ''}
        color="#000000"
        background="#f1f5f9"
        fontSize={20}
        fontWeight={600}
        offsetY={28}
        initials={`${chatRecipient?.username[0]}${chatRecipient?.id[0]}`}
        />
        {/* online */}
        {
          isOnline ? (
            <span 
            className='
            absolute bottom-2 right-0
            h-4 w-4 bg-green-400 rounded-full
            '
            ></span>
          ): (
            <span 
            className='
            absolute bottom-2 right-0
            h-4 w-4 bg-red-400 rounded-full
            '
            ></span>
          )
        }
      </div>
      

      <div
      className='
      text-left
      '
      >
        <h3
        className='text-gray-900 font-bold'
        >
          {(chatRecipient as any)?.username}
        </h3>
        <p className='text-gray-600 text-sm'>
          {lastMsg}
        </p>
      </div>

      <div
      className='
      flex flex-col items-center gap-3
      '
      >
        <div
        className='
        flex gap-2 items-start
        '
        >
          {/* <span
          className='text-green-400'
          >
            {
              isSeen 
              ?(
                <FaCheckDouble size={18}/>
              ):(
                <FaCheck size={18}/>
              )
            }
          </span> */}
          {/* <span
          className='
          text-sm text-gray-500
          '
          >
            23:04
          </span> */}
        </div>
        
        {/* has message */}
        {/* <span
        className='
        flex items-center justify-center
        bg-sky-400 h-3 w-3 rounded-full p-3
        text-white font-bold
        '
        >
          4
        </span> */}
      </div>
    </div>
  )
}

export default Chat