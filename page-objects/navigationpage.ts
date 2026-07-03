import {Page} from "@playwright/test";
import { HelperBase } from "./helperBase";

export class NavigationPage extends HelperBase{

    
    constructor(page:Page){
        super(page)
    }

    async navigateToFormsPage(){
        await this.selectGroupMenuItem("Forms")
        await this.page.getByText("Form Layouts").click()
        await this.waitForNumberOfSeconds(5)
    }

    async navigateToDatePickerPage(){
        await this.selectGroupMenuItem("Forms")
        await this.page.getByText("Datepicker").click()
    }

    async navigateToSmartTablePage(){
        await this.selectGroupMenuItem("Tables & data")
        await this.page.getByText("smart table").click()
    }
    async navigateToTosterPage(){
        await this.selectGroupMenuItem("Modal & Overlays")
        await this.page.getByText("Toastr").click()
    }
    async navigateToTooltipPage(){
        await this.selectGroupMenuItem("Modal & Overlays")
        await this.page.getByText("Tooltip").click()
    }
    private async selectGroupMenuItem(groupItemTitle:string){
        const groupMenuItem=this.page.getByTitle(groupItemTitle)
        const ExpandedState= await groupMenuItem.getAttribute("aria-expanded")
        if (ExpandedState==="false"){
            await groupMenuItem.click()
        }
    }
}