import { Browser, Page } from 'playwright/types/types';
import { chromium } from 'playwright';
//import { launchChromium } from 'playwright-aws-lambda';
import { describe } from 'mocha';
import * as fs from 'fs';
import { AxePlugin, AxeResults } from 'axe-core';
import { expect } from 'chai';

//import {} from 'jasmine'

declare global {
    interface Window {
        axe: AxePlugin
    }
}

let browser: Browser;
let page: Page;

beforeEach(async () => {
    browser = await chromium.launch();
    //browser = await launchChromium();
    page = await browser.newPage();
})

afterEach(async () => {
    await page.close();
    await browser.close();
});

describe('evaluate accessibility', async () => {
    it('should pass accessibility test', async () => {
        await page.goto('https://www.uts.edu.au');
        const file: string = fs.readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8');
        await page.evaluate((minifiedAxe: string) => window.eval(minifiedAxe), file);
        const evaluationResult: AxeResults = await page.evaluate(() => window.axe.run(window.document))
        console.log(evaluationResult.violations)
        expect(evaluationResult.violations).to.be.empty;
    });
}).timeout(10000);