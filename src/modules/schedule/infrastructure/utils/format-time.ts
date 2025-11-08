export function parseTimeToDate(time?: string | null): Date | null {
  if (!time) return null;

  const [hours, minutes] = time.split(':').map(Number);
  const date = new Date();
  date.setHours(hours, minutes, 0, 0); // mantiene la hora local
  return date;
}
