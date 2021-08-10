import React from 'react';
import puppeteer from 'puppeteer';

describe('show/hide an event details', () => {

    let browser;
    let page;
    
    beforeAll(async() => {
        //jest.setTimeout(30000); //just in case if async needs more time to finish
        //this is to watch test being done real time by an imaginary user
        /*const browser = await puppeteer.launch({
            headless: false,
            slowMo: 250, // slow down by 250ms
            ignoreDefaultArgs: ['--disable-extensions'] // ignores default setting that causes timeout errors
        });*/
        browser = await puppeteer.launch();
        page = await browser.newPage();
        await page.goto('http://localhost:3000/');
        await page.waitForSelector('.event');
    });

    afterAll(() => {
        browser.close();
    });

    test('An event element is collapsed by default', async () => {    
        const eventDetails = await page.$('.event .show');
        expect(eventDetails).toBeNull();
    });

    test('User can expand an event to see its details', async () => {
        await page.click('.event .toggle-details');
        const eventDetails = await page.$('.event .hide');
        expect(eventDetails).toBeDefined();
    });

    test('User can collapse an event to hide its details', async () => {
        await page.click('.event .toggle-details');
        const eventDetails = await page.$('.event .show');
        expect(eventDetails).toBeNull();
    });

});

describe('filter events by city', () => {

    let browser;
    let page;
    
    beforeAll(async() => {
        browser = await puppeteer.launch();
        page = await browser.newPage();
        await page.goto('http://localhost:3000/');
        await page.waitForSelector('.event');
    });

    afterAll(() => {
        browser.close();
    });

    test('no city is selected, display all cities', async () => {    
        const allEvent = await page.$('.event');
         expect(allEvent).toBeDefined();
    });

    test('user can search for a city in the textbox', async () => {
        const cityInput = await page.$('.city');
        await cityInput.type('input[name=value]', 'berlin');
        const suggestions = await page.$$('.suggestions li')
        expect(suggestions).toBeDefined();
    });

    test('user can select a city from the suggestion list', async () => {
        const suggestionsCityList = await page.$('.suggestions')
        expect(suggestionsCityList).toBeDefined();
    });

});