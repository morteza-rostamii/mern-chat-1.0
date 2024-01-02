import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import { useSearchParams } from 'react-router-dom';
import { DASHBOARD_ROUTE, TOKEN, USER } from '../consts/const';
import api from '../routes/api';
import useAuthStore from '../stores/auth.store';
//import { TLoginResponse } from '../types/types';

const Login = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const token = searchParams.get(TOKEN);
  const navigate = useNavigate();
  const {setAuthUser,} = useAuthStore();

  useEffect(() => {
    // send token to backend:
    async function loginToken() {

      if (!token) return;
      const data: any = await api.login(
        token, 
        // callback
        (data: any) => {
        // store user in localStorage
        console.log('boobs--', data)
        const userStr: string = JSON.stringify(data.user);
        localStorage.setItem(USER, userStr);

        setAuthUser(localStorage.getItem(USER) ? JSON.parse(localStorage.getItem(USER) as string) : null);
        
        // redirect to dashboard
        navigate(DASHBOARD_ROUTE);
      });

      console.log(data);
    }

    loginToken();
    //console.log('token: ', token, searchParams);
  }, []);

  return (
    <></>
  )
}

export default Login