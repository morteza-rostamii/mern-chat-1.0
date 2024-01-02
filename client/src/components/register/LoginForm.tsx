import { Button, IconButton, Input, InputGroup } from '@chakra-ui/react'
import React, { useState } from 'react'
import { FaInstagram } from 'react-icons/fa'
import { TLoginFormData } from '../../types/types';
import { LOGIN, SIGNUP } from '../../consts/const';
import { FaLongArrowAltLeft } from "react-icons/fa";

const LoginForm = ({
  setFormState,
}: any) => {
  const [formData, setFormDate] = useState<TLoginFormData>({
    magicCode: '',
  });

  function handSignupSubmit(e: any) {
    e.preventDefault();

    console.log(formData);
  }

  function handInputChange(e: any) {
    setFormDate((c: TLoginFormData) => ({
      ...c,
      [e.target.name]: e.target.value,
    }));
  }

  // switch forms:
  const goSignup = () => setFormState(SIGNUP);

  return (
    <form
    className='
    flex flex-col gap-6 
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
        icon={<FaLongArrowAltLeft/>}
        onClick={() => goSignup()}
        >
        </IconButton> */}
        <FaInstagram size={38}/>
        <h1
        className='
        text-xl font-bold tracking-wider
        '
        >
          Login
        </h1>
      </div>

      {/* <InputGroup>
        <Input 
        type='text' 
        placeholder='magic code' 
        name='magicCode'

        value={formData.magicCode}
        onChange={(e:any) => handInputChange(e)}
        />
      </InputGroup>
 */}
      <p>
        we sent you a code, go to your email and click on link to login.
      </p>

      {/* <Button

      type='submit'
      >
        Login
      </Button> */}
    </form>
  )
}

export default LoginForm