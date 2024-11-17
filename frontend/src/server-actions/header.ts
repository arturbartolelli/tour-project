'use server'

import { cookies } from "next/headers"

export const logout = () => {
  return cookies().delete('token')
}

export const getUser = () => {
  return cookies().get('token')?.value
}