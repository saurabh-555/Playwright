import {test,expect} from "@playwright/test"
import {PageManager} from "../page-objects/pageManager"
import {faker} from "@faker-js/faker"

test.beforeEach(async({page})=>{
    await page.goto("/")
})


test('paramatarized methods', async({page})=>{
    const pm=new PageManager(page)

    const randomfullname=faker.person.fullName()
    const randomemail=`${randomfullname.replace(" ", "")}${faker.number.int({ min: 1, max: 999 })}@test.com`

    await pm.navigateTo().navigateToFormsPage()
    await pm.onFormLayoutPage().submitUsingTheGridFormWithCredentialsAndSelectOptions(randomemail,randomfullname,"Option 2")
    await page.locator("nb-card", { hasText: "Inline form" }).screenshot({path:"screenshots/formsLayoutsPage.png"})
    await pm.onFormLayoutPage().submitInlineFormWithNameEmailAndCheckbox(randomfullname,randomemail,false)
})