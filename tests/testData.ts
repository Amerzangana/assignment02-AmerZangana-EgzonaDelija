import { faker } from "@faker-js/faker";
import exp from 'constants';

export const generateRoomsData = () => {
    const number = faker.number.float({ min: 10, max: 30 }).toFixed(0); 
    const floor = faker.number.int({ min: 1, max: 10 }).toString(); 
    const price = faker.commerce.price({ min: 999, max: 5000, dec: 0 }); 
    const available = faker.datatype.boolean(); 
    const categoryOptions = ['Double', 'Single', 'Twin'];
    const features = faker.helpers.arrayElements(
        ['Balcony', 'Ensuite', 'Sea View', 'Penthouse'], 
        faker.number.int({ min: 1, max: 4 })
    );
    const category = faker.helpers.arrayElement(categoryOptions); 
    return {
        number,
        floor,
        price,
        available,
        features,
        category
    };
};














//         const roomNumber = faker.number.float({ min: 20, max: 30 }).toFixed(0),
//         const roomFloor = faker.number.int({ min: 1, max: 10 }).toString(),
//         const roomPrice = faker.commerce.price({ min: 999, max: 5000, dec: 0 }),
//         const available = faker.datatype.boolean(),
        
//         const categoryOptions = ['Double', 'Single', 'Twin'],
//         features: faker.helpers.arrayElements(['Balcony', 'Ensuite', 'Sea View', 'Penthouse'], faker.datatype.number({ min: 1, max: 4 })),
//         category: faker.helpers.arrayElement(categoryOptions),



//         return {
//             features: faker.helpers.arrayElements(['Balcony', 'Ensuite', 'Sea View', 'Penthouse'], faker.datatype.number({ min: 1, max: 4 })),
//             category: faker.helpers.arrayElement(categoryOptions), // Slumpmässigt val av kategori
//             number: faker.datatype.number({ min: 1, max: 100 }),
//             floor: faker.datatype.number({ min: 1, max: 10 }),
//             available: faker.datatype.boolean(), // Slumpmässigt true eller false
//             price: faker.datatype.number({ min: 1000, max: 150000 })
//         };
//     }







        


//         return {
//             category: categoryOptions[category],
//             number: Number((floorNumber + 0 + roomNumber)), 
//             floor: Number(floorNumber),
//             available: available, 
//             price: roomPrice, 
//             features: roomFeatures,
//         }
//     }
// }
