import { test, expect, APIResponse } from '@playwright/test';
import { faker } from "@faker-js/faker";

test.describe("Test Suite Backend V1", ()=>{
  test('Has title', async ({ request }) => {
  const getPostsResponse = await request.get("http://localhost:3000/posts")
  expect (getPostsResponse.ok()).toBeTruthy();
  expect (getPostsResponse.status()).toBe(200);
  //ApiResponse.status();
  //apiResponce.ok(); 
});
test('test cast 02 - Create Post', async ({ request }) => {
    const payload = {
        "title": faker.lorem.sentence(),
        "views": faker.number.int({min:10, max:100})
    }
    const createPostResponse = await request.post("http://localhost:3000/posts", {
      data: JSON.stringify(payload),
    });
    expect(createPostResponse.ok()).toBeTruthy();
    expect(await createPostResponse.json()).toMatchObject(
      expect.objectContaining({
        title:payload.title,
        views:payload.views
      })
    )
    const getPostsResponse = await request.get("http://localhost:3000/posts")
    expect (getPostsResponse.ok()).toBeTruthy();

    const allPosts = await getPostsResponse.json();
    expect(allPosts).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          title: payload.title, 
          views: payload.views,
        })
      ])
    )
  });

  test('Test case 03 - Delete by id', async ({ request }) => {
    // get all post in order to see the list
    const getPostsResponse = await request.get("http://localhost:3000/posts")
    expect (getPostsResponse.ok()).toBeTruthy(); // assertions
    const allPosts = await getPostsResponse.json();
// get the last element on the list
    const lastButOnePostID = allPosts[allPosts.length -2].id;

    //delete request
    const deletePostResponse = await request.delete(`http://localhost:3000/posts/${lastButOnePostID}`);
    expect (deletePostResponse.ok()).toBeTruthy();
// verify the element is gone
    const deleteEllementResponse = await request.delete(`http://localhost:3000/posts/${lastButOnePostID}`);
    expect ( deleteEllementResponse.status()).toBe(404);

    //    expect (getPostsResponse.status()).toBe(200);
  });
})