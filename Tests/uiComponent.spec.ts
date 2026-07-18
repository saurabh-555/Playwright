import{test,expect} from "@playwright/test"

test.beforeEach(async({page})=>{
    await page.goto("/")
})

test.describe("Form Layout page",()=>{
    test.describe.configure({retries:0})
    test.beforeEach(async({page})=>{
        await page.getByText("Forms").click()
        await page.getByText("Form Layouts").click()
    })
    test("input fields",async({page})=>{
        const emailInput=page.locator('nb-card',{hasText:"Using the grid"}).getByRole('textbox',{name:'Email'})
        await emailInput.fill("saurabh")
        await emailInput.clear()
        await emailInput.pressSequentially("saurabh")

        //generic assertions
        const inputValue = await emailInput.inputValue()
        expect(inputValue).toEqual("saurabh")

        //locator assertions
        expect(emailInput).toHaveValue("saurabh")
    })
    test.only("Radio buttons",async({page})=>{
        const UsingTheGrid=page.locator('nb-card',{hasText:"Using the grid"})
        await UsingTheGrid.getByLabel('Option 1').check({force:true})
        await UsingTheGrid.getByRole('radio',{name:'Option 1'}).check({force:true})

        await expect(UsingTheGrid).toHaveScreenshot()
        //validate state of radio buttons

        // const option1= await UsingTheGrid.getByLabel('Option 1').isChecked()

        // const option2= await UsingTheGrid.getByRole('radio',{name:'Option 2'}).isChecked()
        // expect(option1).toBeFalsy()
        // expect(option2).toBeTruthy()
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

test ("list and Dropdowns @smoke",async({page})=>{
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
test ("tooltip",async({page})=>{
    await page.getByText("Modal & Overlays").click()
    await page.getByText("Tooltip").click()

    const tooltip=page.locator("nb-card",({hasText:"Tooltip Placements"}))
    await tooltip.getByRole("button",{name:"top"}).hover()

    const tooltipText= await page.locator("nb-tooltip").textContent()
    expect(tooltipText).toEqual("This is a tooltip")

})
test("dialogue-box",async({page})=>{
    await page.getByText("Tables & data").click()
    await page.getByText("smart table").click()
    
    page.on('dialog',dialog=>{
        expect(dialog.message()).toEqual;("Are you sure you want to delete?")
        dialog.accept()
    })
    await page.getByRole("table").locator('tr',{hasText:"mdo@gmail.com"}).locator('.nb-trash').click()
    
    await expect(page.locator("table tr").first()).not.toHaveText("mdo@gmail.com")
})
test('Web Tables @regression',async({page})=>{
    await page.getByText("Tables & data").click()
    await page.getByText("smart table").click()

    //get the target row
    const targetRow=page.getByRole("row",{name:'twitter@outlook.com'})
    await targetRow.locator('.nb-edit').click()

    await page.locator('input-editor').getByPlaceholder("Age").clear()
    await page.locator('input-editor').getByPlaceholder("Age").fill("25")
    await page.locator('.nb-checkmark').click()
    
    //get the row based on the value in the specific column
    await page.locator('.ng2-smart-pagination').getByText('2').click()
    const targetRowByID=page.getByRole("row",{name:'11'}).filter({has:page.locator('td').nth(1).getByText("11")})
    await targetRowByID.locator('.nb-edit').click()
    await page.locator('input-editor').getByPlaceholder("E-mail").clear()
    await page.locator('input-editor').getByPlaceholder("E-mail").fill("Test@test.com")
    await page.locator('.nb-checkmark').click()
    
    await expect(targetRowByID.locator('td').nth(5)).toHaveText("Test@test.com")
    
    // test filter of the table
    const ages =  ["20", "30", "40", "200"]
    
    for (const age of ages){
        await page.locator('input-filter').getByPlaceholder("Age").clear()
        await page.locator('input-filter').getByPlaceholder("Age").fill(age)
        await page.waitForTimeout(500)
        const rows= page.locator('tbody tr')

        for (let row of await rows.all()){
            const ageValue= await row.locator('td').last().textContent()
            if (age === '200'){
                expect(await page.getByRole('table').textContent()).toContain('No data found')
            }
            else{
                expect(ageValue).toEqual(age)
            }
        }
    }
})

test('date-picker',async({page})=>{
    await page.getByText("Forms").click()
    await page.getByText("Datepicker").click()

    const calenderDate = page.getByPlaceholder("Form Picker")
    await calenderDate.click()

    let date = new Date()
    date.setDate(date.getDate() -1)
    const expectedDate = date.getDate().toString()
    const expectedmonth = date.toLocaleString('default',{month:'short'})
    const expectedYear = date.getFullYear().toString()  
    const dateToAssert = expectedmonth + " " + expectedDate + ", " + expectedYear

    await page.locator('[class="day-cell ng-star-inserted"]').getByText(expectedDate,{exact:true}).click()
    await expect(calenderDate).toHaveValue(dateToAssert)

})

test('sliders',async({page})=>{

    //update attribute

    // const tempGauge=page.locator('[tabtitle="Temperature"] ngx-temperature-dragger circle')
    // await tempGauge.evaluate(node=>{
    //     node.setAttribute("cx","232.630")
    //     node.setAttribute("cy","232.630")
    // })
    // await tempGauge.click()
    
    //mouse movement
    const tempBox=page.locator('[tabtitle="Temperature"] ngx-temperature-dragger ')
    await tempBox.scrollIntoViewIfNeeded()

    const box = await tempBox.boundingBox()
    const x = box.x + box.width / 2
    const y = box.y + box.height / 2
    await page.mouse.move(x,y)  
    await page.mouse.down() 
    await page.mouse.move(x+100,y)
    await page.mouse.move(x+100,y+100)
    await page.mouse.up()

    await expect(tempBox).toContainText("30")
})
