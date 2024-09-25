import { test, expect, APIResponse } from '@playwright/test';
import { faker } from "@faker-js/faker";
import { APIHelper } from './apiHelpers';
import { stringify } from 'querystring';
import exp from 'constants';
import { generateRandomRoomsPayload } from './testData';


const BASE_URL = `${process.env.BASE_URL}`;

test.describe('Test Suite Rooms', () => {
    let apiHelper: APIHelper;

    test.beforeAll( "test", async ({request}) => {
        apiHelper = new APIHelper(BASE_URL);
            const login = await apiHelper.login(request);
            expect(login.ok()).toBeTruthy();
            expect (login.status()).toBe(200);

    });





    test('Get all Rooms', async ({ request }) => {
        const getAllRooms = await apiHelper.getAllRooms(request);
        expect(getAllRooms.ok()).toBeTruthy();
        expect (getAllRooms.status()).toBe(200);
      });


      test('Get Room By ID', async ({ request }) => {
        const getRoomByID = await apiHelper.getRoomByID(request);
        expect(getRoomByID.ok()).toBeTruthy();
        expect (getRoomByID.status()).toBe(200);
    
      });


      test('Create Room', async ({ request }) => {
        const createRoom = await apiHelper.createRoom(request, generateRandomRoomsPayload);
        expect(createRoom.ok()).toBeTruthy();
        expect (createRoom.status()).toBe(200);
    
      });

      test('Create Room V2', async ({ request }) => {
        const payload = generateRandomRoomsPayload();
        const createRoomResponse = await apiHelper.createRoom(request, payload);
        expect(createRoomResponse.ok()).toBeTruthy();
    
        expect(await createRoomResponse.json()).toMatchObject({
          roomNumber: payload.roomNumber,
          roomFloor: payload.roomFloor,
          roomPrice: payload.roomPrice
        })
        const getAllRooms = await apiHelper.getAllRooms(request);
        expect(getAllRooms.ok()).toBeTruthy();
        expect(await getAllRooms.json()).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
                roomNumber: payload.roomNumber,
                roomFloor: payload.roomFloor,
                roomPrice: payload.roomPrice
            })
          ])
        )
      });





})