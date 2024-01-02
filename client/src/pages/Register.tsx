import React, { useState } from 'react'
import { LOGIN, SIGNUP } from '../consts/const';
import SignupForm from '../components/register/SignupForm';
import LoginForm from '../components/register/LoginForm';
import { TFormStates } from '../types/types';

const Register = () => {
  const [formState, setFormState] = useState<TFormStates>(SIGNUP);
  
  return (
    <div
    className='
    flex items-center
    #bg-red-50 h-full
    '
    >
      <div
      className='
      mx-auto
      '
      >
        {formState === SIGNUP ? <SignupForm setFormState={setFormState}/> : ''}
        {formState === LOGIN ? <LoginForm setFormState={setFormState}/> : ''}
      </div>
    </div>
  )
}

export default Register