import { Avatar, Button } from '@chakra-ui/react'
import React, { useState } from 'react'
import getOneImage from '../../../utils/getImage'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  useDisclosure,
} from '@chakra-ui/react'
import { HiOutlineLogout } from "react-icons/hi";
import useAuthStore from '../../../stores/auth.store';
import { AvatarComponent } from 'avatar-initials';
import { useNavigate } from 'react-router';
import { REGISTER_ROUTE } from '../../../consts/const';
import useMsgStore from '../../../stores/msgs.store';

const ProfilePop = () => {
  const { isOpen, onClose, onToggle } = useDisclosure();
  const {authUser, logoutAct} = useAuthStore();
  const {socketio, setSocket} = useMsgStore();
  const navigate = useNavigate();

  function handLogout() {
    onClose();

    // logout
    logoutAct(() => {
      navigate(REGISTER_ROUTE);
      // close socket
      socketio.close();
      setSocket(null);
    });
  }

  return (
    <div >
      <Popover
      isOpen={isOpen}
      onClose={onClose}
      placement='right'
      
      >
        <PopoverTrigger
        >
          <div 
          className='
          cursor-pointer
          ' 
          onClick={onToggle}
          >
            <AvatarComponent
            classes="rounded-full"
            useGravatar={false}
            size={54}
            primarySource={authUser?.avatar || ''}
            color="#000000"
            background="#fff"
            fontSize={20}
            fontWeight={600}
            offsetY={28}
            initials={`${authUser ? authUser?.username[0] : ''}${authUser ? authUser?.id[0] : ''}`}
            
            />
          </div>
        </PopoverTrigger>
        <PopoverContent
        
        >
          <PopoverArrow />
          {/* <PopoverCloseButton>
            sds
          </PopoverCloseButton>
          <PopoverHeader>Confirmation!</PopoverHeader> */}
          <PopoverBody>
            <Button
            rightIcon={<HiOutlineLogout size={24}/>}
            width={'100%'}
            variant={'solid'}
            colorScheme='red'

            onClick={() => handLogout()}
            >
              Logout
            </Button>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default ProfilePop