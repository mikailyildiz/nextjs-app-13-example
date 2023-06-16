'use client'

import { startTransition, useTransition } from 'react'
import { userLogin } from "@/app/lib/userLogin";
import styles from './styles.module.css'


export default function Loginform () {
  let [isPending, startTransition] = useTransition()

  const formSubmit = (e:any) => {
    e.preventDefault()

    startTransition(async ()=> {
      const result = await userLogin()
    })
  }

  return (
    <form onSubmit={formSubmit}>
      inputs
      <button className={styles.loginButton} type="submit">Login</button>
    </form>
  )
}