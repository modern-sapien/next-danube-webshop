import { test, expect } from "@playwright/test"

/**
 * Use this third party service to create a simple CRUD API
 * An API_KEY from https://crudapi.co.uk/ is required for this example to work.
 */
const baseUrl = "https://crudapi.co.uk/api/v1/todo"

const headers = {
  // Learn more about using environment variables here: https://www.checklyhq.com/docs/api-checks/variables
  Authorization: `Bearer ${process.env.CRUD_API_KEY}`,
  "Content-Type": "application/json",
}

/**
 * Share state between hooks and test.steps
 */
let createdResources = null

/**
 * Use `beforeAll` as a setup script
 * Make sure there's no Todo task prior
 */
test.beforeAll(async ({ request }) => {
  const response = await request.get(baseUrl, { headers })
  const { items } = await response.json()
  expect(items.length).toEqual(0)
})

/**
 * Use `afterAll` as a teardown script
 * Remove the created Todo before the check ends
 */
test.afterAll(async ({ request }) => {
  if (createdResources) {
    const response = await request.delete(baseUrl, {
      headers,
      data: createdResources,
    })
    expect(response).toBeOK()
  }
})

test("Todo List", async ({ request }) => {
  await test.step("Create a Todo", async () => {
    const response = await request.post(baseUrl, {
      headers,
      data: [
        {
          title: "Try out Checkly MultiStep",
          done: true,
        },
      ],
    })

    expect(response).toBeOK()
    const { items } = await response.json()
    createdResources = items
  })
})
