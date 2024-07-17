import { test, expect } from "@playwright/test"
import { getAPIResponseTime, markCheckAsDegraded } from "@checkly/playwright-helpers"

const baseUrl = "https://api.spacexdata.com/v3"

test("SpaceX-API Dragon Capsules & Next Launch", async ({ request }) => {
  /**
   * Get all SpaceX Dragon Capsules
   */
  const [first] = await test.step("get all capsules", async () => {
    const response = await request.get(`${baseUrl}/dragons`)

    // Check 200 status code
    expect(response).toBeOK()

    // Check degraded status
    expect.soft(getAPIResponseTime(response), 'GET /dragons too slow').toBeLessThanOrEqual(50)

    return response.json()
  })

  /**
   * Get a single Dragon Capsule and compare with first capsule
   * from the `get all` endpoint
   */
  await test.step("get single dragon capsule", async () => {
    const response = await request.get(`${baseUrl}/dragons/${first.id}`)
    expect(response).toBeOK()

    const capsule = await response.json()
    expect(capsule.name).toEqual(first.name)
  })

  // Trigger degraded state if check failed due to soft assertion
  if (test.info().errors.length) {
    markCheckAsDegraded('Check degraded due to soft assertion failure.')
  }
})