import { Avatar, IconButton } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { HiOutlineDotsVertical } from 'react-icons/hi'
import { HiOutlineBars3BottomLeft } from "react-icons/hi2";
import getOneImage from '../../../utils/getImage';
import { AvatarComponent } from 'avatar-initials';
import useAuthStore from '../../../stores/auth.store';

const Header = ({
  toggleSide,
  //friend,
}: any) => {
  const {currRecipient, onlines} = useAuthStore();
  const [isOnline, setIsOnline] = useState(false);
  //const [chatRecipient, setchatRecipient] = useState(null);

  /* useEffect(() => {
    const chatRecipient = chat.users.filter((user:any) => user.id !== authUser.id);
    setchatRecipient(chatRecipient[0]);
  }, []); */

  useEffect(() => {
    if (currRecipient) {
      const online = onlines.some((userId:any) => (currRecipient as any).id === userId);
      //console.log(online);
      setIsOnline(online);
    }
  }, [onlines, currRecipient]);

  return (
    <header
    className='
    sticky top-0 left-0 right-0 z-10
    flex items-center justify-between p-4
    backdrop-blur-sm #bg-white/30 bg-slate-50
    '
    >
      {/* header */}
      <IconButton
      aria-label=''
      variant={'outline'}      
      isRound={true}
      //colorScheme='green'
      icon={<HiOutlineBars3BottomLeft size={24}/>}
      onClick={toggleSide}
      >
      </IconButton>

      {/* current chat user */}
      <div
      className='
      flex gap-4 items-center
      '
      >
        {/* <Avatar
        src={getOneImage('white')}
        size={'sm'}
        /> */}

      <AvatarComponent
      classes="rounded-full"
      useGravatar={false}
      size={54}
      primarySource={currRecipient?.avatar || ''}
      color="#000000"
      background="#fff"
      fontSize={20}
      fontWeight={600}
      offsetY={28}
      initials={`${currRecipient ? currRecipient?.username[0] : ''}${currRecipient ? currRecipient?.id[0] : ''}`}
      
      />

        <div
        className='
        flex flex-col gap-2 items-center
        '
        >
          {/* <p className='text-sm font-bold text-gray-800 capitalize'>
            angelina
          </p> */}
          {
            isOnline
            ?(
              <div
              className='
              flex gap-2 items-center
              '
              >
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                <span
                className='
                text-gray-500 text-sm
                '
                >Online</span>
              </div>
            ):(
              <div
              className='
              flex gap-2 items-center
              '
              >
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>
                <span
                className='
                text-gray-500 text-sm
                '
                >Offline</span>
              </div>
            )
          }
        </div>
      </div>

      <div>
        <IconButton
        aria-label=''
        variant={'outline'}
        isRound={true}
        icon={<HiOutlineDotsVertical size={24}/>}
        >
        </IconButton>
      </div>
    </header>
  )
}

export default Header