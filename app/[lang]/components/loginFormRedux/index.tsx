'use client'

import { useState, useTransition } from 'react'
import styles from './styles.module.css'
import ErrorMessage from '../errorMessage';
import { useRouter, useSearchParams } from 'next/navigation';
import { api, useLoginMutation } from '@/app/services/auth';
import { setCredentials } from '@/app/slice/authSlice';
import { useAppDispatch } from '@/app/hooks/store';

export default function LoginFormRedux () {
  const [errorMessage, setErrorMessage] = useState({message: '', type: ''})

  const router = useRouter()
  const searchParams = useSearchParams()

  const dispatch = useAppDispatch();

  const [login, { isLoading }] = useLoginMutation()


  const formSubmit = async (e:any) => {
    e.preventDefault()
    clearErrorMessage()

    const form = e.target as HTMLFormElement

    const data = {
      username: form.userName.value as string,
      password: form.password.value as string
    }

    try {
      const resToken = await login(data).unwrap()

      const userId = 1

      const resUser = await dispatch(api.endpoints.getUser.initiate(userId))

      console.log(resUser.data)

      dispatch(setCredentials({
        token: resToken.token,
        user: {...resUser.data}
      }))

      const url = searchParams.get('backUrl') || '/user'
      router.push(url)

      // console.log("auth response:", res)
      //router.push('/user')
    } catch (error) {
      setErrorMessage({message: "Kullanıcı adı veya şifre hatalı", type: "error"})
    }
  }

  const clearErrorMessage = () => {
    setErrorMessage({message: '', type: ''})
  }

  return (
    <form className={styles.loginForm} onSubmit={formSubmit}>
      <label htmlFor="userName">User Name</label>
      <input placeholder="User Name" type="text" id="userName" name="userName" />
      <label htmlFor="password">Password</label>
      <input placeholder="Password" type="password" id="password" name="password" />
      <button disabled={isLoading} className={styles.loginButton} type="submit">Login</button>
      <p>user name: donero password: ewedon</p>
      {errorMessage.message && <ErrorMessage {...errorMessage} />}
    </form>
  )
}