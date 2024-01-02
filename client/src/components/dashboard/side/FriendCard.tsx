import { Avatar } from '@chakra-ui/react'
import React from 'react'
import getOneImage from '../../../utils/getImage'
import FollowBtn from './FollowBtn'

const FriendCard = () => {
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
      <FollowBtn/>
    </div>
  )
}

export default FriendCard