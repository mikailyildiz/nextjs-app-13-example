import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '../store'


export interface UserResponse {
  //user: User
  token: string
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
    login: builder.mutation<UserResponse, LoginRequest>({
      query: (credentials) => ({
        url: 'auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    protected: builder.mutation<{ message: string }, void>({
      query: () => 'protected',
    }),
  })
})

export const { useLoginMutation } = api