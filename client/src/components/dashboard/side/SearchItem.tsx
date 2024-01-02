import React from 'react'
import {AvatarComponent} from 'avatar-initials';
import { Button } from '@chakra-ui/react';
import useAuthStore from '../../../stores/auth.store';
import useChatStore from '../../../stores/chat.store';

const SearchItem = ({
  user,
  setLoading,
  searchedName,
}: any) => {
  const {authUser, addFriendAct, searchUsersAct} = useAuthStore();
  const {fetchChatsAct, } = useChatStore();

  async function handAddFriend() {
    const payload = {
      senderId: authUser.id,
      recipientId: user.id,
    };

    setLoading(true);
    await addFriendAct(payload);
    setLoading(false);

    // get searched user again
    await searchUsersAct({
      authUserId: authUser.id,
      username: searchedName,
    });

    // get chats again
    await fetchChatsAct({authUserId: authUser.id});
  }

  return (
    <li
    className='
    flex items-center justify-between p-2 bg-slate-50 rounded-md
    '
    >
      <AvatarComponent
      classes="rounded-full"
      useGravatar={false}
      size={54}
      primarySource={user?.avatar || ''}
      color="#000000"
      background="#fff"
      fontSize={20}
      fontWeight={600}
      offsetY={28}
      initials={`${user.username[0]}${user.id[0]}`}
      
      />

      <p>
        {user.username}
      </p>

      <Button
      variant={'outline'}
      colorScheme='cyan'
      borderRadius={'9999px'}

      onClick={handAddFriend}
      >
        add
      </Button>
    </li>
  )
}

export default SearchItem