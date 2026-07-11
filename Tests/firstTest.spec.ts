import {test,expect} from "@playwright/test"
test.beforeEach(async({page})=>{
    await page.goto("http://localhost:4200/")
    await page.getByText("Forms").click()
    await page.getByText("Form Layouts").click()
})
test("Locator syntax rules",async({page})=>{
    //by tag name
    await page.locator("input").first().click()
    //by id
    page.locator("#inputEmail1")
    //by class value
    page.locator(".shape-rectangle")
    //by attribute
    page.locator("[placeholder='Email']")
    //by class value full
    page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]')
    //combine different selectors
    page.locator("input[placeholder='Email'][nbinput]")
    //xpath(not recomended)
    page.locator("//*[@id='inputEmail1']")
    //partial text match
    page.locator(":text('using')")
    //full text match
    page.locator(":text-is('Using the Grid')")
})
test("User facing locators",async({page})=>{
    await page.getByRole('textbox',{name:'Email'}).first().click()
    await page.getByRole('button',{name:"Sign in"}).first().click()

    await page.getByLabel('Email').first().click()

    await page.getByPlaceholder('Password').first().click()
    await page.getByPlaceholder('Jane Doe').first().click()

    await page.getByText('Remember me').first().click()
    await page.getByTestId('SignIn').click()

    await page.getByTitle('IoT Dashboard').click()
})
test('locating children elements', async({page})=>{
    await page.locator('nb-card nb-radio :text-is("Option 1")').click()
    await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click()

    await page.locator('nb-card').getByRole('button',{name: "Sign in"}).first().click() 
    await page.locator('nb-card').nth(4).getByRole('button').click()
})

test('Locating parent elements',async({page})=>{
    await page.locator('nb-card',{hasText:"Using the Grid"}).getByRole('textbox',{name:'Email'}).click()
    await page.locator('nb-card',{has:page.locator('#inputEmail1')}).getByRole('textbox',{name:'Email'}).click()

    await page.locator('nb-card').filter({hasText:"Basic form"}).getByRole('textbox',{name:'Email'}).click()
    await page.locator('nb-card').filter({has:page.locator('.status-danger')}).getByRole('textbox',{name:'Email'}).click()

    await page.locator('nb-card').filter({has:page.locator('nb-checkbox')}).filter({hasText:"Sign in"})
    .getByRole('textbox',{name:'Email'}).click()
    //xpath
    await page.locator(':text-is("Using the Grid")').locator('..').getByRole('textbox',{name:'Email'}).click()
})
test('Reusing Locators', async({page})=>{

    //locators are objects that contain information about how to find an element on the page. They are not the element itself. 
    // We can reuse locators to perform different actions on the same element or to locate child elements.

    const BasicForm = page.locator('nb-card',{hasText:'basic form'})
    const Email= BasicForm.getByRole('textbox',{name:'Email'})
    const Password = BasicForm.getByRole('textbox',{name:'Password'})

    //actions

    await Email.fill('saurabh,hazaribag555@gmail.com')
    await Password.fill('saurabh')
    await BasicForm.locator('nb-checkbox').click()
    await BasicForm.getByRole('button').click()

    //assertions(verification)

    await expect(Email).toHaveValue('saurabh,hazaribag555@gmail.com')

    
})
//Assertion
test('Extracting text', async({page})=>{
    const BasicForm = page.locator('nb-card').filter({hasText:'Basic form'})
    const ButtonText = await BasicForm.locator('button').textContent()
    expect(ButtonText).toEqual('Submit')

    //All text values
    const radio =await page.locator("nb-radio").allTextContents()
    expect(radio).toContainEqual('Option 1')

    //input values 
    const Email = BasicForm.getByRole('textbox',{name:'Email'})
    await Email.fill('saurabh@5555')
    const EmailValue = await Email.inputValue()
    expect(EmailValue).toEqual('saurabh@5555')
    console.log(EmailValue)

    const placeholderValue = await Email.getAttribute('placeholder')
    expect(placeholderValue).toEqual('Email')   
    console.log(placeholderValue)

    })
test("Assertions",async({page})=>{
    //general assertion(generic assertion)
    const value =5
    expect(value).toEqual(5)
    const BasicFormButton = page.locator('nb-card').filter({hasText:'Basic form'}).locator("button")
    const text= await BasicFormButton.textContent()
    expect(text).toEqual('Submit')

    //Locator assertion
    await expect(BasicFormButton).toHaveText('Submit')

    //soft assertion
    await expect.soft(BasicFormButton).toHaveText('Submit')
    await BasicFormButton.click()
})  
