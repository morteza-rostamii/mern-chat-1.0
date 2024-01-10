import { Button, IconButton, Input, InputGroup } from '@chakra-ui/react'
import React, { useState } from 'react'
import { FaInstagram, FaLongArrowAltRight } from 'react-icons/fa'
import { TRegisterResponse, TSignupFormData } from '../../types/types';
import { LOGIN, USER } from '../../consts/const';
import api from '../../routes/api';
import toast from 'react-hot-toast';
import validateEmail from '../../utils/validateEmail';
import isWhitespace from '../../utils/checkWhitespace';
import LoadScreen from '../LoadScreen';

const toastNoUsername = () => toast.error('Enter an username', {
  duration: 4000,
});
const toastNoEmail = () => toast.error('Enter a valid email', {
  duration: 4000,
});

const SignupForm = ({
  setFormState,
}: any) => {
  const [formData, setFormDate] = useState<TSignupFormData>({
    username: '',
    email: '',
  });
  const [loading, setLoading] = useState(false);

  function handInputChange(e: any) {
    setFormDate((c: TSignupFormData) => ({
      ...c,
      [e.target.name]: e.target.value,
    }));
  }

  async function handSignupSubmit(e: any) {
    e.preventDefault();

    const username: string = formData.username;
    const email: string = formData.email;
    if (!username || username.length < 5 || isWhitespace(username)) return toastNoUsername();
    if (!email || !validateEmail(email)) return toastNoEmail();

    // auth/register
    setLoading(true);
    const response: any | null = await api.register(formData);

    if (response?.success) {
      //console.log(response);
      setLoading(false);
      goLogin();
    }
  }

  // switch forms:
  const goLogin = () => setFormState(LOGIN);

  return (
    <form
    className='
    flex flex-col gap-6 
    relative
    bg-white p-6 rounded-md shadow-md
    '

    onSubmit={(e:any) => handSignupSubmit(e)}
    >
      <div
      className='
      flex flex-col items-center gap-4
      '
      >
        {/* <IconButton
        aria-label=''
        variant={'outline'}
        icon={<FaLongArrowAltRight/>}

        onClick={() => goLogin()}
        >
        </IconButton> */}
        <FaInstagram size={38}/>
        <h1
        className='
        text-xl font-bold tracking-wider
        '
        >
          Signup
        </h1>
      </div>

      <InputGroup>
        <Input 
        type='text' 
        placeholder='username' 
        name='username'

        value={formData.username}
        onChange={(e:any) => handInputChange(e)}
        />
      </InputGroup>

      <InputGroup>
        <Input 
        type='text' 
        placeholder='email' 
        name='email'
        //formNoValidate
        value={formData.email}
        onChange={(e:any) => handInputChange(e)}
        />
      </InputGroup>

      <p>
        we send you an link
      </p>

      <Button

      type='submit'
      >
        signup
      </Button>

      {
        loading ?(
          <LoadScreen/>
        ): ''
      }
    </form>
  )
}

export default SignupForm