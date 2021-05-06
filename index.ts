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
exports.checkAccessibility = (req, res) => {
    switch (req.method) {
        case 'POST':
            let browser: Browser
            let page: Page
            
            (async () => {
                browser = await chromium.launch()
                //browser = await launchChromium()
            
                page = await browser.newPage()
        
                const url_to_check = req.query.url || 'https://www.uts.edu.au'
            
                await page.goto(url_to_check)
                const file: string = fs.readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8')
                await page.evaluate((minifiedAxe: string) => window.eval(minifiedAxe), file)
                const evaluationResult: AxeResults = await page.evaluate(() => window.axe.run(window.document))
                res.send(JSON.stringify(evaluationResult.violations, null, 2))
                await page.close()
                await browser.close()
            })
            break
        default:
            res.send({error: 'Only POST is supported'})
            break
    }
}
