'use server'

import { ActionError } from "@/utils/error"
import { cookies } from "next/headers"

const defaultUrl = process.env.NEXT_PUBLIC_SERVICE as string

export default async function fetchAdmin<T>(
  route: string,
  init: RequestInit = {},
  url: string = defaultUrl
): Promise<T | ActionError> {

  const token = cookies().get('token')?.value
  if (token) {
    init.headers = {
      ...init.headers,
      Authorization: `Bearer ${token}`,
    }
  }
  
  const res: Response = await fetch(url + route, init)
  
  if (res.status > 399) {
    const data = await res.json()
    const error: ActionError = { message: data.message, status: res.status }
    return error
  }

  return await res.json()
}
