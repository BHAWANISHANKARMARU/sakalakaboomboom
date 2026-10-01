export type TextCounts = {
  words: number;
  characters: number;
  charactersWithoutSpaces: number;
  sentences: number;
  paragraphs: number;
  readingMinutes: number;
};
export function countText(
  text: string,
  segmenter?: Intl.Segmenter,
): TextCounts {
  const trimmed = text.trim();
  const active =
    segmenter ??
    (typeof Intl.Segmenter === "function"
      ? new Intl.Segmenter(undefined, { granularity: "word" })
      : undefined);
  const words = !trimmed
    ? 0
    : active
      ? Array.from(active.segment(trimmed)).filter((item) => item.isWordLike)
          .length
      : (trimmed.match(/[\p{L}\p{N}]+(?:['’_-][\p{L}\p{N}]+)*/gu) ?? []).length;
  const sentences = !trimmed
    ? 0
    : (trimmed.match(/[^.!?।]+[.!?।]+|[^.!?।]+$/gu) ?? []).filter((item) =>
        item.trim(),
      ).length;
  const paragraphs = !trimmed
    ? 0
    : trimmed.split(/\n\s*\n/).filter(Boolean).length;
  return {
    words,
    characters: Array.from(text).length,
    charactersWithoutSpaces: Array.from(text.replace(/\s/g, "")).length,
    sentences,
    paragraphs,
    readingMinutes: words ? Math.max(1, Math.ceil(words / 200)) : 0,
  };
}
