import {test,expect} from "@playwright/test"
import {PageManager} from "../page-objects/pageManager"

test.beforeEach(async({page})=>{
    await page.goto("http://localhost:4200/")
})

test("Navigate to forms page",async({page})=>{
    const pm=new PageManager(page)
    await pm.navigateTo().navigateToFormsPage()
    await pm.navigateTo().navigateToDatePickerPage()
    await pm.navigateTo().navigateToSmartTablePage()
    await pm.navigateTo().navigateToTosterPage()
    await pm.navigateTo().navigateToTooltipPage()
})
test('paramatarized methods', async({page})=>{
    const pm=new PageManager(page)

    await pm.navigateTo().navigateToFormsPage()
    await pm.onFormLayoutPage().submitUsingTheGridFormWithCredentialsAndSelectOptions("saurabh@gamil.com,","saurabh","Option 2")
    await pm.onFormLayoutPage().submitInlineFormWithNameEmailAndCheckbox("Saurabh","saurabh@gamil.com",false)
    await pm.navigateTo().navigateToDatePickerPage()
    await pm.onDatePickerPage().selectCommonDatePickerDateFromToday(17)
})