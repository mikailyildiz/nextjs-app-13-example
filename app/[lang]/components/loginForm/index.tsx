'use client'

import { startTransition, useState, useTransition } from 'react'
import { userLogin } from "@/app/lib/userLogin";
import styles from './styles.module.css'
import ErrorMessage from '../errorMessage';
import { useRouter, useSearchParams } from 'next/navigation';

export default function Loginform () {
  let [isPending, startTransition] = useTransition()
  const [errorMessage, setErrorMessage] = useState({message: '', type: ''})

  const router = useRouter()
  const searchParams = useSearchParams()

  const formSubmit = (e:any) => {
    e.preventDefault()
    clearErrorMessage()

    const form = e.target as HTMLFormElement

    const data = {
      userName: form.userName.value as string,
      password: form.password.value as string
    }


    startTransition(async ()=> {
      const result = await userLogin(data)
      
      if (result && result.token){
        const url = searchParams.get('backUrl') || '/user'
        router.push(url)
      } else if(!result || result.error){
        setErrorMessage({message: result.message, type: result.type})
      }
    })
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
      <button disabled={isPending} className={styles.loginButton} type="submit">Login</button>
      <p>user name: donero password: ewedon</p>
      {errorMessage.message && <ErrorMessage {...errorMessage} />}
    </form>
  )
}