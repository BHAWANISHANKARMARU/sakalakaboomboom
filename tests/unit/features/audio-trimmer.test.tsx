import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { AudioTrimmer } from "@/features/youtube-audio/audio-trimmer";
afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});
it("moves both selection handles and plays from the selected start", async () => {
  vi.spyOn(HTMLMediaElement.prototype, "play").mockResolvedValue();
  vi.spyOn(HTMLMediaElement.prototype, "pause").mockImplementation(() => {});
  const { container } = render(
    <AudioTrimmer
      src="blob:test"
      blob={new Blob()}
      duration={20}
      filename="Song.mp3"
      videoUrl="https://youtu.be/jNQXAC9IVRw"
    />,
  );
  fireEvent.keyDown(screen.getByRole("slider", { name: "Selection start" }), {
    key: "ArrowRight",
    shiftKey: true,
  });
  fireEvent.keyDown(screen.getByRole("slider", { name: "Selection end" }), {
    key: "ArrowLeft",
    shiftKey: true,
  });
  expect(
    screen.getByRole("slider", { name: "Selection start" }),
  ).toHaveAttribute("aria-valuenow", "1");
  expect(screen.getByRole("slider", { name: "Selection end" })).toHaveAttribute(
    "aria-valuenow",
    "19",
  );
  fireEvent.click(screen.getByRole("button", { name: "Play selection" }));
  const audio = container.querySelector("audio")!;
  expect(audio.currentTime).toBe(1);
  expect(audio.play).toHaveBeenCalled();
  audio.currentTime = 19;
  fireEvent.timeUpdate(audio);
  expect(audio.pause).toHaveBeenCalled();
});
it("exports only the selected range and invalidates an old clip when handles change", async () => {
  vi.spyOn(HTMLMediaElement.prototype, "pause").mockImplementation(() => {});
  Object.defineProperty(URL, "createObjectURL", {
    configurable: true,
    value: () => "blob:clip",
  });
  Object.defineProperty(URL, "revokeObjectURL", {
    configurable: true,
    value: vi.fn(),
  });
  const fetcher = vi
    .fn()
    .mockResolvedValue({
      ok: true,
      headers: new Headers({
        "content-type": "audio/mpeg",
        "content-disposition": "attachment; filename*=UTF-8''Song.mp3",
      }),
      blob: async () => new Blob(["ID3"]),
    });
  vi.stubGlobal("fetch", fetcher);
  render(
    <AudioTrimmer
      src="blob:test"
      blob={new Blob()}
      duration={20}
      filename="Song.mp3"
      videoUrl="https://youtu.be/jNQXAC9IVRw"
    />,
  );
  fireEvent.keyDown(screen.getByRole("slider", { name: "Selection start" }), {
    key: "ArrowRight",
    shiftKey: true,
  });
  fireEvent.keyDown(screen.getByRole("slider", { name: "Selection end" }), {
    key: "ArrowLeft",
    shiftKey: true,
  });
  fireEvent.click(screen.getByRole("button", { name: "Prepare trimmed MP3" }));
  expect(
    await screen.findByRole("link", { name: "Download trimmed MP3" }),
  ).toHaveAttribute("download", "Song.mp3");
  expect(JSON.parse(fetcher.mock.calls[0][1].body).trim).toEqual({
    start: 1,
    end: 19,
  });
  fireEvent.keyDown(screen.getByRole("slider", { name: "Selection start" }), {
    key: "End",
  });
  expect(
    Number(
      screen
        .getByRole("slider", { name: "Selection start" })
        .getAttribute("aria-valuenow"),
    ),
  ).toBeLessThan(19);
  expect(
    screen.queryByRole("link", { name: "Download trimmed MP3" }),
  ).not.toBeInTheDocument();
});
