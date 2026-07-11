import {test,expect} from "@playwright/test"

test.beforeEach(async({page})=>{
    await page.goto("http://uitestingplayground.com/ajax/")
    await page.getByRole("button",{name:"Button Triggering AJAX Request"}).click()
})

test("Auto waiting",async({page})=>{
    const message=page.locator(".bg-success")
    //await message.click()
    // await message.waitFor({state:"attached"})
    // const text = await message.allTextContents()
    // expect(text).toContain("Data loaded with AJAX get request.")
    
    await expect(message).toHaveText("Data loaded with AJAX get request.",{timeout:20000})
})
test("Alternative Waits",async({page})=>{
    const message=page.locator(".bg-success")

    //wait for element
    //await page.waitForSelector(".bg-success")

    //wait for particular response
    // await page.waitForResponse("http://uitestingplayground.com/ajaxdata")

    //wait for network calls to be completed
    await page.waitForLoadState("networkidle")

    const text = await message.allTextContents()
    expect(text).toContain("Data loaded with AJAX get request.")
})

test('timeout',async({page})=>{
    //test.setTimeout(12000)
    test.slow()
    const Button=page.locator(".bg-success")
    await Button.click()
})