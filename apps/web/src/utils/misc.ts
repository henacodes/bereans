import { formatDistance, parse } from "date-fns";

export function parseSQLiteDate(str: string): Date {
  const d = parse(str, "yyyy-MM-dd HH:mm:ss", new Date());
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000);
}

export function formatTimestamp(dateStr: string) {
  return formatDistance(parseSQLiteDate(dateStr), new Date(), {
    addSuffix: true,
  });
}
