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
        expect(inputValue).toEqual("saurabh")

        //locator assertions
        expect(emailInput).toHaveValue("saurabh")
    })
    test("Radio buttons",async({page})=>{
        const UsingTheGrid=page.locator('nb-card',{hasText:"Using the grid"})
        await UsingTheGrid.getByLabel('Option 1').check({force:true})
        await page.waitForTimeout(2000)
        await UsingTheGrid.getByRole('radio',{name:'Option 2'}).check({force:true})

        //validate state of radio buttons

        const option1= await UsingTheGrid.getByLabel('Option 1').isChecked()
        const option2= await UsingTheGrid.getByRole('radio',{name:'Option 2'}).isChecked()
        expect(option1).toBeFalsy()
        expect(option2).toBeTruthy()
    })
})