import { Button, IconButton } from '@chakra-ui/react'
import React from 'react'
import { HiChevronDoubleLeft } from "react-icons/hi";
import Header from './Header';
import ChatItem from './DirMsgItem';
import ChatSection from './ChatSection';
import MsgForm from './MsgForm';
import LoadScreen from '../../LoadScreen';
import useChatStore from '../../../stores/chat.store';

type TMainProps = {
  toggleSide: () => void,
}

const Main = ({
  toggleSide,
}: TMainProps) => {
  const {loading} = useChatStore();
  return (
    <main
    className='
    relative
    flex flex-col gap-4
    #bg-blue-100 #p-4 h-full
    flex-1
    '

    style={{
      //flexGrow: 1,
      //flexShrink: 1,
      //flexBasis: 0,
      //flex: '0 0 60%',
    }}
    >
      <div
      className='
      overflow-hidden min-h-full  #bg-red-100
      '
      >
        <Header
        toggleSide={toggleSide}
        />

        {/* chat section */}
        <ChatSection/>

        {/* message form */}
        <MsgForm/>

        {loading ? <LoadScreen/> : ''}
      </div>
    </main>
  )
}

export default Main