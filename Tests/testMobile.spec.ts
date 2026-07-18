import{test,expect} from "@playwright/test"


test("input fields",async({page},testInfo)=>{
    await page.goto("/")
    if(testInfo.project.name==="mobile"){
        await page.locator(".sidebar-toggle").click()
    }
    await page.getByText("Forms").click()
    await page.getByText("Form Layouts").click()
    if(testInfo.project.name==="mobile"){
        await page.locator(".sidebar-toggle").click()
    }
    const emailInput=page.locator('nb-card',{hasText:"Using the grid"}).getByRole('textbox',{name:'Email'})
    await emailInput.fill("saurabh")
    await emailInput.clear()
    await emailInput.pressSequentially("saurabh")
})