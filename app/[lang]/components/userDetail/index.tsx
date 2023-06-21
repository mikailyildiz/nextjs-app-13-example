'use client'

import { useAuth } from "@/app/hooks/useAuth"


export default function UserDetail () {

  const auth = useAuth()
  

  return (
  <div>
    Store Email Address: {auth.user?.email}
  </div>
  )
}