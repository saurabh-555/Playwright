import { Page } from "@playwright/test";

export class formLayoutPage{
    private readonly page:Page

    constructor(page:Page){
        this.page=page
    }
    async submitUsingTheGridFormWithCredentialsAndSelectOptions(email:string,password:string,optionsTest:string){
        const usingTheGridForm=this.page.locator("nb-card", { hasText: "Using the Grid" })
        await usingTheGridForm.getByRole("textbox",{name:"Email"}).fill(email)
        await usingTheGridForm.getByRole("textbox",{name:"Password"}).fill(password)
        await usingTheGridForm.getByRole("radio",{name:optionsTest}).check({force:true})
        await usingTheGridForm.getByRole("button").click()
    }
    /**
     * This method is used to submit the inline form with name, email and checkbox.
     * @param name ->first name
     * @param email -> email address
     * @param rememberMe -> checkbox
     */
    async submitInlineFormWithNameEmailAndCheckbox(name:string,email:string,rememberMe:boolean){
        const inlineForm=this.page.locator("nb-card", { hasText: "Inline form" })
        await inlineForm.getByRole("textbox",{name:"Jane Doe"}).fill(name)
        await inlineForm.getByRole("textbox",{name:"Email"}).fill(email)
        if(rememberMe)
            await inlineForm.getByRole("checkbox").check({force:true})
        
        await inlineForm.getByRole("button").click()
    }
}
