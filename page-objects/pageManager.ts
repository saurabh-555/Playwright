import {Page , expect}from "@playwright/test";
import {NavigationPage} from "../page-objects/navigationpage"
import {FormLayoutPage } from "../page-objects/formLayoutPage"
import {DatePickerPage} from "../page-objects/datePickerPage"

export class PageManager{
    private readonly page: Page
    private readonly NavigationPage: NavigationPage
    private readonly FormLayoutPage: FormLayoutPage
    private readonly DatePickerPage: DatePickerPage

    constructor(page:Page){
        this.page=page
        this.NavigationPage=new NavigationPage(this.page)
        this.FormLayoutPage=new FormLayoutPage(this.page)
        this.DatePickerPage=new DatePickerPage(this.page)
    }
    navigateTo(){
        return this.NavigationPage
    }
    onFormLayoutPage(){
        return this.FormLayoutPage
    }
    onDatePickerPage(){
        return this.DatePickerPage
    }   
}