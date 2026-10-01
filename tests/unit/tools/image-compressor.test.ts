import { describe, expect, it } from "vitest";
import { validateImageFile } from "@/features/image-compressor/validate";
describe("image compressor", () => {
  it("accepts a matching JPEG signature", async () =>
    expect(
      (
        await validateImageFile(
          new File([new Uint8Array([0xff, 0xd8, 0xff, 0, 0])], "photo.jpg", {
            type: "image/jpeg",
          }),
        )
      ).ok,
    ).toBe(true));
  it("rejects spoofed image input", async () =>
    expect(
      (
        await validateImageFile(
          new File(["fake"], "photo.jpg", { type: "image/jpeg" }),
        )
      ).ok,
    ).toBe(false));
});
