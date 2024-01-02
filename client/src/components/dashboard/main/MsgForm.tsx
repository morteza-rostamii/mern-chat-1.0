import React, { useEffect, useRef, useState } from 'react'
import { FormControl, IconButton, Input } from '@chakra-ui/react'
import { FaImage } from "react-icons/fa6";
import { HiEmojiHappy } from "react-icons/hi";
import { BsFillEmojiHeartEyesFill } from "react-icons/bs";
import { HiMiniMicrophone, HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { Textarea } from '@chakra-ui/react'
import EmojiPicker from 'emoji-picker-react';
import EmojiPopup from './EmojiPopup';
import useMsgStore from '../../../stores/msgs.store';
import useAuthStore from '../../../stores/auth.store';
import toast from 'react-hot-toast';
import isWhitespace from '../../../utils/checkWhitespace';
import { BiSolidSend } from "react-icons/bi";
import useChatStore from '../../../stores/chat.store';

const toastMsgEmpty = () => toast.error('Enter some message', {
  duration: 4000,
});
const toastNoChat = () => toast.error('Pick a chat first', {
  duration: 4000,
});

const MsgForm = () => {
  const [formData, setFormData] = useState({
    text: '',
    image: null,
    emoji: '',
  });
  const {authUser, currRecipient} = useAuthStore();
  const {sendMessageAct, } = useMsgStore();
  const {loading, setLoading} = useChatStore();

  const labelRef = useRef(null);

  function handInputChange(e: any) {

    if (e.target?.files?.length) {
      const file = e.target?.files[0];
      console.log(file)
      if (file) {
        setFormData(c => ({
          ...c,
          [e.target.name]: file,
        }));
        return;
      }
    }

    setFormData(c => ({
      ...c,
      [e.target.name]: e.target.value,
    }));
  }

  async function handSubmit(e:any) {
    e.preventDefault();

    const msgFormData = new FormData();

    if (!currRecipient) return toastNoChat();
    // if message empty
    if (!formData.text || isWhitespace(formData.text)) return toastMsgEmpty();

    setLoading(true);

    if (formData.image) {
      const file: any = formData.image;
      const reader = new FileReader();

      reader.onloadend = async (event: any) => {
        const fileData: any = {
          name: file.name,
          type: file.type,
          // extract base64 data
          //data: event.target.result.split(',')[1],
          data: reader.result,
        }
        //console.log('---', msgFormData)
        msgFormData.append('image', JSON.stringify(fileData));
        msgFormData.append('text', formData.text);
        msgFormData.append('senderId', authUser.id);
        msgFormData.append('recipientId', currRecipient.id);

        await sendMessageAct(msgFormData);
        //console.log(msgFormData);
        setFormData({
          text: '',
          image: null,
          emoji: '',
        });
        setLoading(false);
      }

      reader.readAsDataURL(file);
    } else {
      msgFormData.append('text', formData.text);
      msgFormData.append('senderId', authUser.id);
      msgFormData.append('recipientId', currRecipient.id);
  
      await sendMessageAct(msgFormData);
      setFormData({
        text: '',
        image: null,
        emoji: '',
      });
      setLoading(false);
      //console.log(msgFormData);
    }
    /* for (let key of msgFormData.entries()) {
      console.log(key[0])
    } */
    // can't just console.log formData
    //console.log(formData)
  }

  useEffect(() => {
    setFormData((c:any) => ({
      ...c,
      text: formData.text + ' ' + formData.emoji,
    }))
  }, [formData.emoji]);

  return (
    <form
    className='
    absolute bottom-6 left-0 right-0
    flex items-center gap-6
    bg-white p-4 shadow-md w-[90%] mx-auto rounded-md
    '
    style={{
      zIndex: 9,
    }}
    onSubmit={(e:any) => handSubmit(e)}
    encType='multipart/form-data'
    >
      {/* actions left */}
      <div
      className='flex items-center gap-3'
      >
        <FormControl>
          <label 
          //id='image-label'
          ref={labelRef}
          className='
          block #bg-red-50
          '
          htmlFor="image">
            <IconButton
            aria-label=''
            icon={<FaImage size={24} color={'gray'}/>}
            variant={'ghost'}
            isRound={true}

            // trigger click on label
            onClick={() => labelRef.current ? (labelRef.current as any).click() : ''}
            >
            </IconButton>
          </label>
          <Input
          id='image'
          type='file'
          name='image'
          onChange={handInputChange}
          display={'none'}
          />
        </FormControl>

        <span
        className='
        text-yellow-400
        '
        >
          <EmojiPopup setFormData={setFormData}/>
        </span>
      </div>
      
      <Textarea
        placeholder='Here is a sample placeholder'
        size='sm'
        rows={1}
        resize={'vertical'}
        variant={'flushed'}
        name='text'
        value={formData.text}
        onChange={(e:any) => handInputChange(e)}
        fontSize={18}
      />

      <div
      className='flex items-center gap-3'
      >
        {/* <IconButton
        aria-label=''
        icon={<FaImage size={24}/>}
        variant={'ghost'}
        isRound={true}
        >
        </IconButton> */}

        <span
        className='
        text-gray-400
        '
        >
          <IconButton
          aria-label=''
          icon={<BiSolidSend  size={24} color={'gray'}/>}
          variant={'ghost'}
          isRound={true}
          type='submit'
          >
          </IconButton>
        </span>
      </div>
    </form>
  )
}

export default MsgForm