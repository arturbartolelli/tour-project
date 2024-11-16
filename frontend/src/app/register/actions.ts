"use server";

import fetchAdmin from "@/server-actions/fetchAdmin";
import { ActionError, isActionError } from "@/utils/error";

type RegisterUserResponse = {
  data: {
    userId: string;
  };
};

export async function registerUser(
  fullName: string,
  email: string,
  password: string
): Promise<RegisterUserResponse | ActionError> {
  return fetchAdmin<RegisterUserResponse>("/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ fullName, email, password }),
  })
    .then((res) => {
      if (!isActionError(res)) {
        return res;
      }
      console.error(res);
      return res;
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