import { test, expect } from '@playwright/test';

test('Validate Attributes', async ({ request }) => {
    const response = await request.get(
        'https://adventurers-guild-api.vercel.app/api/attributes'
    );

    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    expect(responseBody[0].id).toBe(1);
    expect(responseBody[0].name).toBe('Strength');
    expect(responseBody[0].shortname).toBe('STR');
    expect(responseBody[0].description).toBe(
        'Measures physical power, carrying capacity, and effectiveness in brute-force actions such as lifting, pushing, and melee attacks.'
    );
    expect(responseBody[0].skills[0]).toBe('Athletics');
});