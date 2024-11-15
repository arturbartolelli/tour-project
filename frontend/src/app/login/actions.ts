'use server'

import { User } from "@/context/UserContext";
import fetchAdmin from "@/server-actions/fetchAdmin";
import { ActionError, isActionError } from "@/utils/error";
import { cookies } from "next/headers";

type UserResponse = {
  data: {
    token: string
    user: User
  }
}

export async function loginUser(email: string, password: string): Promise<UserResponse | ActionError>{
  return fetchAdmin<UserResponse>(`/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => {
      if(!isActionError(res)) {
        if(res.data.token) {
          const token = res.data.token;
          cookies().set("token", token, {
            httpOnly: true,
            secure: true,
            path: "/",
          });
        }
        return res
      }
      console.error(res)
      return res
    })
    .catch((err) => {
      if (isActionError(err)) {
        return Promise.reject(err);
      }
      return Promise.reject({
        message: "Erro inesperado",
        status: 500,
      });
    });
}
