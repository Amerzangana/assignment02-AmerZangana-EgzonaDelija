import { test, expect, APIResponse } from '@playwright/test';
import { faker } from "@faker-js/faker";
import { APIHelper } from './apiHelpers';
import { stringify } from 'querystring';
import exp from 'constants';
import * as testData from './testData';


const BASE_URL = `${process.env.BASE_URL}`;

test.describe('Test Suite Hotel', () => {
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

      test('Update Room Information', async ({ request }) => {
        const payload = testData.generateRoomsData();
        const updateRoom = await apiHelper.updateRoom(request, payload);
        expect(updateRoom.ok()).toBeTruthy();
        expect (updateRoom.status()).toBe(200);
        expect.objectContaining({
            number: payload.number,
            floor: payload.floor,
            price: payload.price,
            id: payload.id
        });
      });


    test('Create Room', async ({ request }) => {
        const payload = testData.generateRoomsData();
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
    
    test('Get all Bills', async ({ request }) => {
      const getAllBills = await apiHelper.getAllBills(request);
      expect(getAllBills.ok()).toBeTruthy();
      expect (getAllBills.status()).toBe(200);
    });
    test('Create Bill', async ({ request }) => {
        const payload = testData.generateBillData();
        const createBill = await apiHelper.createBill(request, payload);
        expect(createBill.ok()).toBeTruthy();
        expect (createBill.status()).toBe(200);
        expect.objectContaining({
            value: payload.value,
            paid: payload.paid
        });
      });
      test('Create Client', async ({ request }) => {
        const payload = testData.generateClientData();
        const createClient = await apiHelper.createClient(request, payload);
        expect(createClient.ok()).toBeTruthy();
            expect.objectContaining({
            name: payload.name,
            email: payload.email,
            telephone: payload.telephone
    });
    });
      

    test('Get all Clients', async ({ request }) => {
        const getAllClients = await apiHelper.getAllClients(request);
        expect(getAllClients.ok()).toBeTruthy();
        expect (getAllClients.status()).toBe(200);
      });

      test('Delete Client By ID2', async ({ request }) => {
        const allClients = await (await apiHelper.getAllClients(request)).json();
        const lastButOneID = allClients[allClients.length - 2].id;
    
        expect((await apiHelper.deleteClientById(request, lastButOneID)).ok()).toBeTruthy();
        expect((await apiHelper.getByID(request, lastButOneID)).status()).toBe(401);
    });

});