import { test, expect } from "@playwright/test"

/**
 * Use this third party service to create a simple CRUD API
 * An API_KEY from https://crudapi.co.uk/ is required for this example to work.
 */
const baseUrl = "https://crudapi.co.uk/api/v1/todo"

const headers = {
  Authorization: `Bearer ${process.env.CRUD_API_KEY}`,
  "Content-Type": "application/json",
}

let createdResources = null

test.beforeAll(async ({ request }) => {
  const response = await request.get(baseUrl, { headers })
  const { items } = await response.json()
  expect(items.length).toEqual(0)
})

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
