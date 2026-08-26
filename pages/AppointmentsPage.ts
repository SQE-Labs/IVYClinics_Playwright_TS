import { Locator, Page } from "@playwright/test";
import { BasePage } from "../base/BasePage"

export class AppointmentsPage extends BasePage {

    readonly appointmentsTab: Locator;
    readonly bookAppointmentButton: Locator;
    readonly bookAppointmentHeading: Locator;
    readonly patientSearchField: Locator;
    readonly selectClinicOption: Function;
    readonly clinicsDropdown: Locator;
    readonly clinicSwitchMessage: Locator;
    readonly departmentDropdown: Locator;

    constructor(page: Page) {
        super(page)

        this.appointmentsTab = page.getByRole('link', { name: 'Appointments', exact: true });
        this.bookAppointmentButton = page.getByRole('button', { name: 'Book Appointment', exact: true });
        this.bookAppointmentHeading = page.getByRole('heading', { name: 'Book Appointment' });
        this.patientSearchField = page.getByRole('textbox', { name: 'Search by name, phone, or MRN...' });
        this.selectClinicOption = (clinicName: string) => page.getByRole('option', { name: clinicName })
        this.clinicsDropdown = page.locator("(//header)[1]/div[2]")
        this.clinicSwitchMessage = page.getByText('Clinic switched')
        this.departmentDropdown = page.getByRole('combobox', { name: 'Department*' })
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

    async selectPatientByMrn(mrn: string) {
        await this.click(this.page.getByText(mrn, { exact: true }));
    }
    async clickClinicsDropdown() {
        await this.waitForElement(this.clinicsDropdown);
        await this.click(this.clinicsDropdown);
    }
    async selectClinic(clinicName: string) {
        await this.click(this.selectClinicOption(clinicName));
    }
    async selectDepartmentDropdown(department: string) {
        await this.departmentDropdown.selectOption(department)
    }

}