import { Page } from "@playwright/test";

export class formLayoutPage{
    private readonly page:Page

    constructor(page:Page){
        this.page=page
    }
    async submitUsingTheGridFormWithCredentialsAndSelectOptions(email:string,password:string,optionsTest:string){
        const UsingTheGridForm=this.page.locator("nb-card", { hasText: "Using the Grid" })
        await UsingTheGridForm.getByRole("textbox",{name:"Email"}).fill(email)
        await UsingTheGridForm.getByRole("textbox",{name:"Password"}).fill(password)
        await UsingTheGridForm.getByRole("radio",{name:optionsTest}).check({force:true})
        await UsingTheGridForm.getByRole("button").click()
    }
}
