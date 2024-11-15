'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

export type User = {
  id: string
  name: string
  email: string
  isAdmin: boolean
  createdAt: string
  deletedAt: string
  password: string
  uuid: string
}

type UserContextType = {
  user: User | null
  setUser: (user: User | null) => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({
  children,
  initialUser = null,
}: {
  children: ReactNode
  initialUser?: User | null
}) {
  const [user, setUser] = useState<User | null>(initialUser)

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}
