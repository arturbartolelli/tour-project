"use server";

import { ActionError, isActionError } from "@/utils/error";
import { Reserva, User } from "./page";
import fetchAdmin from "@/server-actions/fetchAdmin";

export const getTours = async (): Promise<Reserva[] | ActionError> => {
  return await fetchAdmin<{ data: Reserva[] }>("/tour")
    .then((res) => {
      if (isActionError(res)) {
        console.error(res);
        return res;
      }
      return res.data;
    })
    .catch((err) => {
      console.error(err);
      return { message: err.message, status: err.status };
    });
};

type EditReservation = {
  reservation: string;
  price: string;
  city: string;
};

export const updateTour = async (
  id: string,
  data: EditReservation
): Promise<Reserva[] | ActionError> => {
  return await fetchAdmin<{ data: Reserva[] }>(`/tour/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => {
    if (isActionError(res)) {
      console.error(res);
      return res;
    }
    return res.data;
  });
};

export const deleteTours = async (
  id: string
): Promise<Reserva[] | ActionError> => {
  return await fetchAdmin<{ data: Reserva[] }>(`/tour/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (isActionError(res)) {
      console.error(res);
      return res;
    }
    return res.data;
  });
};

export const getUsers = async (): Promise<User[] | ActionError> => {
  return await fetchAdmin<{data: User[]}>("/user")
    .then((res) => {
      if (isActionError(res)) {
        console.error(res);
        return res;
      }
      return res.data;
    })
    .catch((err) => {
      console.error(err);
      return { message: err.message, status: err.status };
    });
};
