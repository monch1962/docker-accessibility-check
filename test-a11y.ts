import { Browser, Page } from 'playwright/types/types'

import { chromium } from 'playwright'
//import { launchChromium } from 'playwright-aws-lambda'

import * as fs from 'fs'
import { AxePlugin, AxeResults } from 'axe-core'

declare global {
    interface Window {
        axe: AxePlugin
    }
}

let browser: Browser
let page: Page

(async () => {
    browser = await chromium.launch()
    //browser = await launchChromium()

    page = await browser.newPage()

    const url = process.env.URL || 'https://www.uts.edu.au'
    await page.goto(url)
    const file: string = fs.readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8')
    await page.evaluate((minifiedAxe: string) => window.eval(minifiedAxe), file)
    const evaluationResult: AxeResults = await page.evaluate(() => window.axe.run(window.document))
    process.exitCode = evaluationResult.violations.length
    console.log(JSON.stringify(evaluationResult.violations, null, 2))
    await page.close()
    await browser.close()
})()
