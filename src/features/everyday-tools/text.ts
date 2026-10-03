export const removeDuplicateLines = (value: string) =>
  [...new Set(value.split(/\r?\n/))].join("\n");

export const cleanWhitespace = (value: string) =>
  value
    .split(/\r?\n/)
    .map((line) => line.trim().replace(/[\t ]+/g, " "))
    .filter(Boolean)
    .join("\n");

export const sortLines = (value: string) =>
  value
    .split(/\r?\n/)
    .sort((a, b) => a.localeCompare(b))
    .join("\n");

export const convertCase = (value: string, mode: string) => {
  if (mode === "upper") return value.toUpperCase();
  if (mode === "lower") return value.toLowerCase();
  if (mode === "title")
    return value.toLowerCase().replace(/\b\p{L}/gu, (c) => c.toUpperCase());
  return value.replace(/(^|[.!?]\s+)\p{L}/gu, (c) => c.toUpperCase());
};
