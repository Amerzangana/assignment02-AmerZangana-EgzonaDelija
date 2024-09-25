import { test, expect, APIResponse } from '@playwright/test';
import { faker } from "@faker-js/faker";
import { APIHelper } from './apiHelpers';
import { stringify } from 'querystring';
import exp from 'constants';
import { generateRoomsData } from './testData';


const BASE_URL = `${process.env.BASE_URL}`;

test.describe('Test Suite Rooms', () => {
    let apiHelper: APIHelper;
    
    test.beforeAll(async ({ request }) => {
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

      test('Delete Room By ID', async ({ request }) => {
        const deleteRoomById = await apiHelper.deleteRoomById(request);
        expect(deleteRoomById.ok()).toBeTruthy();
        expect (deleteRoomById.status()).toBe(200);
    
      });


    test('Create Room V2', async ({ request }) => {
        const payload = generateRoomsData();
        const createRoom = await apiHelper.createRoom(request, payload);
        expect(createRoom.ok()).toBeTruthy();
            expect.objectContaining({
            number: payload.number,
            floor: payload.floor,
            price: payload.price,
            available: payload.available,
            features: expect.arrayContaining(payload.features),
            category: payload.category
        });
    });
});