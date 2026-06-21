import {test,expect} from "@playwright/test"
import {NavigationPage} from "../page-objects/navigationpage"
import { formLayoutPage } from "../page-objects/formLayoutPage"

test.beforeEach(async({page})=>{
    await page.goto("http://localhost:4200/")
})

test("Navigate to forms page",async({page})=>{
    const navigationPage=new NavigationPage(page)
    await navigationPage.navigateToFormsPage()
    await navigationPage.navigateToDatePickerPage()
    await navigationPage.navigateToSmartTablePage()
    await navigationPage.navigateToTosterPage()
    await navigationPage.navigateToTooltipPage()
})
test('paramatarized methods', async({page})=>{
    const navigationPage=new NavigationPage(page)
    const onFormLayoutPage=new formLayoutPage(page)

    await navigationPage.navigateToFormsPage()
    await onFormLayoutPage.submitUsingTheGridFormWithCredentialsAndSelectOptions("saurabh@gamil.com,","saurabh","Option 2")
})