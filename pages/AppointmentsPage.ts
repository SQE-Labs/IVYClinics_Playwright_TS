import { Locator, Page } from "@playwright/test";
import { BasePage } from "../base/BasePage"

export class AppointmentsPage extends BasePage{

    readonly appointmentsTab: Locator;
    readonly bookAppointmentButton: Locator;
    readonly bookAppointmentHeading: Locator;
    readonly patientSearchField: Locator;

    constructor(page: Page) {
        super(page)

        this.appointmentsTab = page.getByRole('link', { name: 'Appointments', exact: true });
        this.bookAppointmentButton = page.getByRole('button', { name: 'Book Appointment', exact: true });
        this.bookAppointmentHeading = page.getByRole('heading', { name: 'Book Appointment' });
        this.patientSearchField = page.getByRole('textbox', { name: 'Search by name, phone, or MRN...' });
    }



    async clickAppointmentsTab() {
        await this.click(this.appointmentsTab)
    }

    async clickBookAppointmentButton() {
        await this.click(this.bookAppointmentButton)
    }

    async searchPatientField(searchText: string) {
        await this.fill(this.patientSearchField, searchText)
    }

}