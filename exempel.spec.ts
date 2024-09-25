import { test, expect, APIResponse } from '@playwright/test';
import { faker } from "@faker-js/faker";
import { APIHelper } from './apiHelpers';
import { stringify } from 'querystring';
import { generateRandomPostPayload } from './testData';
import exp from 'constants';

const BASE_URL = 'http://localhost:3000';

test.describe("Test Suite Backend V1", ()=>{
  let apiHelper: APIHelper;
  
  test.beforeAll(() => {
    apiHelper = new APIHelper(BASE_URL);


  });

  test('Test case 01 - Get All Posts V2', async ({ request }) => {
    const getPosts = await apiHelper.getAllPosts(request);
    expect(getPosts.ok()).toBeTruthy();

  });

  test('Test case 02 - Create Posts V2', async ({ request }) => {
    const payload = generateRandomPostPayload();
    const createPostResponse = await apiHelper.createpost(request, payload);
    expect(createPostResponse.ok()).toBeTruthy();

    expect(await createPostResponse.json()).toMatchObject({
      title: payload.title,
      views: payload.views
    })
    const getPosts = await apiHelper.getAllPosts(request);
    expect(getPosts.ok()).toBeTruthy();
    expect(await getPosts.json()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          title: payload.title, 
          views: payload.views,
        })
      ])
    )
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

  test('Test case 03 - Delete Post V2', async ({ request }) => {
    const getPosts = await apiHelper.getAllPosts(request);
    expect(getPosts.ok()).toBeTruthy();
    const allPosts = await getPosts.json();
    const lastButOneID = allPosts[allPosts.length -2];
//delte requests
    const deleteRequest = await apiHelper.deletePost(request, lastButOneID);

    expect(deleteRequest.ok()).toBeTruthy();

    const getPostById = await apiHelper.getByID(request, lastButOneID);
    expect(getPostById.status()).toBe(404);


  });
})