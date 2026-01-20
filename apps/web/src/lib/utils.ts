import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { formatDistance, parse } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function objToQueryString<T extends object, K extends keyof T>(
  obj: T,
  keys: K[],
) {
  const params = new URLSearchParams();

  // instead of converting all properties of the obj, only selected keys will be built
  keys.forEach((key) => {
    const value = obj[key];
    if (value !== undefined && value !== null) {
      params.append(String(key), String(value));
    }
  });

  return params.toString();
}

export function parseSQLiteDate(str: string): Date {
  const d = parse(str, "yyyy-MM-dd HH:mm:ss", new Date());
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000);
}

export function formatTimestamp(dateStr: string) {
  return formatDistance(parseSQLiteDate(dateStr), new Date(), {
    addSuffix: true,
  });
}
