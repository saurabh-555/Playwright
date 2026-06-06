import {test,expect} from "@playwright/test"
import {NavigationPage} from "../page-objects/navigationpage"

test.beforeEach(async({page})=>{
    await page.goto("http://localhost:4200/")
})

test("Navigate to forms page",async({page})=>{
    const navigationPage=new NavigationPage(page)
    await navigationPage.navigateToFormsPage()
    
})