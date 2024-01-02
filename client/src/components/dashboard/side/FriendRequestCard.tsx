import { Avatar, Button } from '@chakra-ui/react'
import React from 'react'
import getOneImage from '../../../utils/getImage'
import FollowBtn from './FollowBtn'

const FriendRequestCard = () => {
  return (
    <div
    className='
    flex gap-3 items-center justify-between bg-white p-2 rounded-md
    '
    >
      <Avatar
      src={getOneImage('white')}
      />

      <div>
        <p>
          Lorem.
        </p>
      </div>

      {/* add, pending, added */}
      <Button
      variant={'outline'}
      colorScheme='cyan'
      borderRadius={'9999px'}
      width={'100%'}
      size={'sm'}
      >
        Confirm
      </Button>
      <Button
      variant={'outline'}
      colorScheme='red'
      borderRadius={'9999px'}
      width={'100%'}
      size={'sm'}
      >
        Delete
      </Button>
    </div>
  )
}

export default FriendRequestCard