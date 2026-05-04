import {test} from "@playwright/test"
 test("amazon",async({page})=>{
    await page.goto("https://amazon.com/")
    await page.getByRole("searchbox").fill("playwright book")
    await page.keyboard.press("Enter")
    await page.waitForTimeout(5000)
 })