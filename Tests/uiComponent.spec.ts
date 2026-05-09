import{test,expect} from "@playwright/test"

test.beforeEach(async({page})=>{
    await page.goto("http://localhost:4200/")
})
test.describe("Form Layout page",()=>{
    test.beforeEach(async({page})=>{
        await page.getByText("Forms").click()
        await page.getByText("Form Layouts").click()
    })
    test("input fields",async({page})=>{
        const emailInput=page.locator('nb-card',{hasText:"Using the grid"}).getByRole('textbox',{name:'Email'})
        await emailInput.fill("saurabh")
        await emailInput.clear()
        await emailInput.pressSequentially("saurabh",{delay:500})

        //generic assertions
        const inputValue = await emailInput.inputValue()
        await expect(inputValue).toEqual("saurabh")

        //locator assertions
        await expect(emailInput).toHaveValue("saurabh")
    })
    test("Radio buttons",async({page})=>{
        const Radio=page.locator('nb-card',{hasText:"Using the grid"}).getByLabel('Option 1')
        await Radio.check({force:true})
        await expect(Radio).toBeChecked()
    })
})