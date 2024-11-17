import { jwtDecode } from 'jwt-decode';
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function decodeJwtToken(token: string) {
  try {
    const decoded = jwtDecode(token)
    return decoded;
  } catch (error) {
    console.error("Invalid JWT token", error);
    return null;
  }
}

export const formatDateAndTime = (isoDate: string, isoTime: string): { date: string; time: string } => {
  const date = new Date(isoDate);
  const time = new Date(isoTime);

  const formattedDate = date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const formattedTime = time.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return { date: formattedDate, time: formattedTime };
};
