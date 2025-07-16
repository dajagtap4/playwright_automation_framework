class EventPage {

constructor(page)
{
    this.page = page;
    this.createEventButton = page.locator(".subtitle+div>button");
    this.dropdown = page.locator("#selectEventType");
    this.createEvent_ButtonOnPopup = page.locator(".Modal-module_footer__4-TiA>:last-child");
    //this.jk = page.locator('#select-event-type-option-jk');
    this.fromDate = page.locator("#startDate");
    this.toDate = page.locator("#endDate");
}

async createEvent(){
    await this.page.waitForLoadState('networkidle'); 
    await this.createEventButton.click();
    await this.dropdown.click();
    await this.selectEventTypeFromDropdown("jk");
    await this.createEvent_ButtonOnPopup.click();
    await this.page.pause();
}

// calendar elements are not available on DOM so using direct .fill();
async selectDateFromCalendar(){
    await this.page.waitForLoadState('networkidle'); 
    await this.fromDate.fill('2025-07-31T18:15');
    await this.toDate.fill('2025-07-31T19:15');
}

async selectEventTypeFromDropdown(optionId) {
    await this.dropdown.click();
    await this.page.locator(`#select-event-type-option-${optionId}`).click();
}


}
module.exports = {EventPage};