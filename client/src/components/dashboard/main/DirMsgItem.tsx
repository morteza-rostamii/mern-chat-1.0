import React from 'react'
import type { TMessage } from '../../../types/types';
import { FaCheck, FaCheckDouble } from 'react-icons/fa';
import { formatDateToTime } from '../../../utils/formatDate';
import { Image } from '@chakra-ui/react';
import useAuthStore from '../../../stores/auth.store';
import { motion } from 'framer-motion';

type TChatItemProps = {
  msg: TMessage,
};

const DirMsgItem = ({
  msg,
}: TChatItemProps) => {
  const {authUser, } = useAuthStore();

  return (
    <motion.div
    className={`
    ${(msg?.senderId === authUser.id) ? "self-end" : 'self-start'}
    ${msg?.senderId === authUser.id ? 'self-end bg-sky-600 text-white' : 'bg-slate-100'}
    flex flex-col gap-4
    p-2 max-w-96 w-full rounded-md text-left 
    `}

    initial={{
      scale: 0.8,
    }}
    animate={{
      scale: 1,
    }}
    transition={{
      duration: 0.5,
      stiffness: 500,
      damping: 20,
    }}
    >
      <div
      className='
      flex items-center gap-4 justify-between
      '
      >

        <p>
          {msg.text}
        </p>

        <div
        className='flex items-start gap-2 self-start'
        >
          <span
          className={`
          ${!msg?.senderId === authUser.id && 'text-gray-400'}
          `}
          >
            {formatDateToTime(msg.createdAt)}
          </span>
          {/* <span
          className='text-green-400'
          >
            {
              msg.isSeen 
              ?(
                <FaCheckDouble size={18}/>
              ):(
                <FaCheck size={18}/>
              )
            }
          </span> */}
        </div>
      </div>

      {/* image */}
      {
        msg?.image
        ?(
          <div
          className='
          overflow-hidden rounded-md w-40 h-40
          '
          >
            <Image
            className='
            object-cover w-full h-full
            '
            src={msg.image}
            alt='img'
            />
          </div>
        ):''
      }
    </motion.div>
  )
}

export default DirMsgItem