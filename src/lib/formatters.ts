export function formatUsername(username: string) {
  return username
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
}

const dateFormatter = Intl.DateTimeFormat(undefined, {
  dateStyle: "short",
  timeStyle: "short",
});

export function formatDate(date: Date) {
  return dateFormatter.format(date);
}
