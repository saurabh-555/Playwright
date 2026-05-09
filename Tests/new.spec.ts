import {test,expect} from "@playwright/test"
 test("amazon",async({page})=>{
   await page.goto("https://amazon.com/")
   const searchbox=page.getByRole("searchbox")
   await searchbox.fill("playwright book")
   const content= await searchbox.inputValue()
   await page.keyboard.press("Enter")
   await expect(content).toEqual("playwright book")
   await page.waitForTimeout(5000)
 })