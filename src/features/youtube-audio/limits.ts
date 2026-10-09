// 240 seconds at 128 kbps is about 3.84 MB, below Vercel's 4.5 MB response limit.
export const AUDIO_MAX_SECONDS = 240;
export const AUDIO_MAX_OUTPUT_BYTES = 4_000_000;
export const AUDIO_MAX_MINUTES = AUDIO_MAX_SECONDS / 60;
