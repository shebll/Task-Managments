export function formatStatus(status: string) {
  return status.replace(/_/g, " ");
}

export function truncateEpicTitle(title: string, maxLength = 100) {
  if (title.length <= maxLength) return title;

  return `${title.slice(0, maxLength)}...`;
}
