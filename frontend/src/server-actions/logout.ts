'use server'

import { cookies } from "next/headers"

export const logout = () => {
  return cookies().delete('token')
}