import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '../store'



export interface User {
  id:number
  email: string
  name: {
    firstname:string
    lastname:string
  },
}

export interface TokenResponse {
  token: string
}
export interface UserResponse {
  user: User
}

export interface LoginRequest {
  username: string
  password: string
}


export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://fakestoreapi.com/',
    prepareHeaders: (headers, {getState})=> {
      const token = (getState() as RootState).auth.token

      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
    }
  }),
  endpoints: (builder) => ({
    login: builder.mutation<TokenResponse, LoginRequest>({
      query: (credentials) => ({
        url: 'auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    getUser: builder.query<UserResponse, Number>({
      query: (id) => `users/${id}`
    }),
    protected: builder.mutation<{ message: string }, void>({
      query: () => 'protected',
    }),
  })
})

export const { useLoginMutation, useGetUserQuery } = api