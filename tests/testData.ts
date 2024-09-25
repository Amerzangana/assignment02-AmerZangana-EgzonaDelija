import { faker } from "@faker-js/faker";


export const generateRandomRoomsPayload = () => {
    return {
        roomNumber: faker.number.float({ min: 20, max: 30 }).toFixed(0),
        roomFloor: faker.number.int({ min: 1, max: 10 }).toString(),
        roomPrice: faker.commerce.price({ min: 10000, max: 500000, dec: 0 })
    }
}
