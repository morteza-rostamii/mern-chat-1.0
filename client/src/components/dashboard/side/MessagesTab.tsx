import React, { useEffect, useState } from 'react'
import Chat from './Chat'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import LoadScreen from '../../LoadScreen'
import useAuthStore from '../../../stores/auth.store'
import ChatSection from '../main/ChatSection'
import useChatStore from '../../../stores/chat.store'

const MessagesTab = () => {
  //const [loading, setLoading] = useState(true);
  const {authUser, setCurrRecipient} = useAuthStore();
  const {fetchChatsAct, chats, setActiveChatAct, loading, setLoading} = useChatStore();

  // set current recipient
  async function handSetRecipient(chat: any) {
    //console.log(chat);
    const chatRecipient = chat.users.filter((user:any) => user.id !== authUser.id);
    //console.log(chatRecipient)
    setCurrRecipient(chatRecipient[0]);
    setActiveChatAct(chat.id);

    // get chats again
    setLoading(true);
    await fetchChatsAct({authUserId: authUser.id});
    setLoading(false);
  }

  useEffect(() => {
    async function fetchUserChats() {
      // get friends with conversations:
      setLoading(true);
      await fetchChatsAct({authUserId: authUser.id});
      setLoading(false);
    }
    fetchUserChats();
  }, []);

  return (
    <div
    className='
    relative #h-full 
    '
    >
      
      <div
      className='
      flex flex-col gap-4 overflow-auto
      '
      >
      {
        chats && chats.length
        ?(
          chats.map((el:any) => (
            <Chat
            key={el.id}
            chat={el}
            handClick={handSetRecipient}
            />
          ))
        ):(
          <div
          className='
          text-lg text-gray-600 font-bold mt-10
          bg-white rounded-md p-4
          '
          >
            You have no friends
          </div>
        )
      }
      </div>

      {/* overlay load */}
      { loading ? <LoadScreen/> : '' }
    </div>
  )
}

export default MessagesTab