import {test,expect} from "@playwright/test"
import {NavigationPage} from "../page-objects/navigationpage"
import { formLayoutPage } from "../page-objects/formLayoutPage"
import {datePickerPage} from "../page-objects/datePickerPage"

test.beforeEach(async({page})=>{
    await page.goto("http://localhost:4200/")
})

test("Navigate to forms page",async({page})=>{
    const navigateTo=new NavigationPage(page)
    await navigateTo.navigateToFormsPage()
    await navigateTo.navigateToDatePickerPage()
    await navigateTo.navigateToSmartTablePage()
    await navigateTo.navigateToTosterPage()
    await navigateTo.navigateToTooltipPage()
})
test('paramatarized methods', async({page})=>{
    const navigateTo=new NavigationPage(page)
    const onFormLayoutPage=new formLayoutPage(page)
    const onDatePickerPage=new datePickerPage(page)

    await navigateTo.navigateToFormsPage()
    await onFormLayoutPage.submitUsingTheGridFormWithCredentialsAndSelectOptions("saurabh@gamil.com,","saurabh","Option 2")
    await onFormLayoutPage.submitInlineFormWithNameEmailAndCheckbox("Saurabh","saurabh@gamil.com",false)
    await navigateTo.navigateToDatePickerPage()
    await onDatePickerPage.selectCommonDatePickerDateFromToday(17)
})