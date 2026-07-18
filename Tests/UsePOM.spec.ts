import {test,expect} from "@playwright/test"
import {PageManager} from "../page-objects/pageManager"
import {faker} from "@faker-js/faker"
import { argosScreenshot } from "@argos-ci/playwright"

test.beforeEach(async({page})=>{
    await page.goto("/")
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

    const randomfullname=faker.person.fullName()
    const randomemail=`${randomfullname.replace(" ", "")}${faker.number.int({ min: 1, max: 999 })}@test.com`

    await pm.navigateTo().navigateToFormsPage()
    await pm.onFormLayoutPage().submitUsingTheGridFormWithCredentialsAndSelectOptions(randomemail,randomfullname,"Option 2")
    await page.locator("nb-card", { hasText: "Inline form" }).screenshot({path:"screenshots/formsLayoutsPage.png"})
    await pm.onFormLayoutPage().submitInlineFormWithNameEmailAndCheckbox(randomfullname,randomemail,false)
    // await pm.navigateTo().navigateToDatePickerPage()
    // await pm.onDatePickerPage().selectCommonDatePickerDateFromToday(17)
})
test.only("Testing With Argos Ci ",async({page})=>{
    const pm=new PageManager(page)
    await pm.navigateTo().navigateToFormsPage()
    await argosScreenshot(page, "formsLayoutsPage", { fullPage: true });
    await pm.navigateTo().navigateToDatePickerPage()
    await argosScreenshot(page, "datePickerPage", { fullPage: true });
})