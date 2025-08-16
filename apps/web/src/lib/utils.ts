import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function objToQueryString<T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
) {
  const params = new URLSearchParams();

  keys.forEach((key) => {
    const value = obj[key];
    if (value !== undefined && value !== null) {
      params.append(String(key), String(value)); // cast key and value to string
    }
  });

  return params.toString();
}
