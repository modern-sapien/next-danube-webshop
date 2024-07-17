import { test, expect } from "@playwright/test"
import crypto from "crypto"

test("Verify Binary Payloads", async ({ request }) => {
  // SpaceX Launch Images
  const IMAGES_TO_VERIFY = [
    {
      url: "https://farm1.staticflickr.com/856/28684550147_49802752b3_o.jpg",
      hash: "46df689c0016e4f06746f07b83546d5e",
    },
    {
      url: "https://farm1.staticflickr.com/927/28684552447_956a9744f1_o.jpg",
      hash: "ffb011da0c7cc45413c632ccd62947cf",
    },
    {
      url: "https://farm2.staticflickr.com/1828/29700007298_8ac5891d2c_o.jpg",
      hash: "eab74946120df579967922794e387276",
    },
    {
      url: "https://farm1.staticflickr.com/914/29700004918_31ed7b73ef_o.jpg",
      hash: "5e20e98a63522a0829aa5ad0003e52c6",
    },
  ]

  for (const [index, { url, hash }] of IMAGES_TO_VERIFY.entries()) {
    await test.step(`Fetch image #${index}`, async () => {
      const response = await request.get(url)

      const body = await response.body()
      expect(crypto.createHash("md5").update(body).digest("hex")).toBe(hash)
    })
  }
})