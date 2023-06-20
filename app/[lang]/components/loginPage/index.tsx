'use client'

import LoginFormRedux from '../loginFormRedux'
import { Provider } from 'react-redux'
import { store } from '../../../store'

export default function LoginPage() {
  return (
    <Provider store={store}>
      <LoginFormRedux />
    </Provider>
  )
}