import { test, expect } from '@playwright/test';

let token = '';
let charID = 0;

test.describe.serial('Character flow validation', () => {

    test.beforeAll(async ({ request }) => {
        // API call for requesting the token.
        const tokenResponse = await request.post('/api/auth/token', {
            data: { 
                username: 'dianan', 
                password: 'A7m!Q2v#L9p@R4xK'
            },
        });

        // Validate if the token is returning a 200 code in the response.
        expect(tokenResponse.status()).toBe(200);

        // Get the token and set it into the responseBody variable.
        const responseBody = await tokenResponse.json();

        // Show the token on the terminal console.
        token = responseBody.token;
    });

    test('Get Character List', async ({ request }) => {
        // Get characters.
        const charactersResponse = await request.get('/api/characters', {
            headers: { Authorization: 'Bearer ' + token },
        });

        // Validate if the characters response is returning a 200 code.
        expect(charactersResponse.status()).toBe(200);

        // Get the character response and set it into the characterResponseBody variable.
        const characterResponseBody = await charactersResponse.json();

        // Get my character in the position 2 from the array.
        expect(characterResponseBody[2].id).toBe(2319);

        // Set the ID in the charID variable.
        charID = characterResponseBody[2].id;
    });

    test('Get Character By Id', async ({ request }) => {
        const charactersIdResponse = await request.get('/api/characters/' + charID);
        expect(charactersIdResponse.status()).toBe(200);
    });

    test('Validate Character Data', async ({ request }) => {

        // Get characters.
        const charactersResponse = await request.get('/api/characters', {
            headers: { Authorization: 'Bearer ' + token },
        });

        const characterResponseBody = await charactersResponse.json();

        const expectedData = [
            {
                "id": 1686,
                "name": "Bruno the Barberian",
                "level": 1,
                "status": "draft"
            },
            {
                "id": 2017,
                "name": "Daniela Fighter 1776715893783",
                "level": 1,
                "status": "draft"
            },
            {
                "id": 2319,
                "name": "Diana, the Noble Elf Ranger",
                "level": 1,
                "status": "complete"
            }
        ];

        characterResponseBody.forEach((item, index) => {

            test.step(`${item.name} - id`, async () => {
                expect(item.id).toBe(expectedData[index].id);
            });

            test.step(`${item.name} - name`, async () => {
                expect(item.name).toBe(expectedData[index].name);
            });
        
            test.step(`${item.name} - level`, async () => {
                expect(item.level).toBe(expectedData[index].level);
            });

            test.step(`${item.name} - status`, async () => {
                expect(item.status).toBe(expectedData[index].status);
            });
        });
    });
});