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

test("checkBoxes",async({page})=>{
    await page.getByText("Modal & Overlays").click()
    await page.getByText("Toastr").click()
    await page.getByRole("checkbox",{name:'Hide on click'}).uncheck({force:true})
    await page.getByRole("checkbox",{name:'Prevent arising of duplicate toast'}).check({force:true})

    const allCheckBoxes=page.getByRole("checkbox")
    for(const box of await allCheckBoxes.all()){
        await box.uncheck({force:true})
        expect (await box.isChecked()).toBeFalsy()
    }
})

test ("list and Dropdowns",async({page})=>{
    const dropDown = page.locator("ngx-header nb-select")
    await dropDown.click()
    
    page.getByRole('list') //when list has UL tag
    page.getByRole('listitem') //when list has LI tag
    
    const option=page.locator('nb-option-list nb-option')
    
    await expect(option).toHaveText(["Light","Dark","Cosmic","Corporate"])
    
    await option.filter({hasText:"Cosmic"}).click()
    const header = page.locator("nb-layout-header")
    await expect(header).toHaveCSS("background-color","rgb(50, 50, 89)")
    
    const colors={
        "Light":"rgb(255, 255, 255)",
        "Dark":"rgb(34, 43, 69)",
        "Cosmic":"rgb(50, 50, 89)",
        "Corporate":"rgb(255, 255, 255)"
    }
    for (const colour of Object.keys(colors) as Array<keyof typeof colors>){
        await dropDown.click()
        await option.filter({hasText:colour}).click()
        await expect(header).toHaveCSS("background-color",colors[colour])
    }
})