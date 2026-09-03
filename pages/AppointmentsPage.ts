import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "../base/BasePage"
import { utils } from "../utils/Utility";

export class AppointmentsPage extends BasePage {

    readonly appointmentsTab: Locator;
    readonly bookAppointmentButton: Locator;
    readonly bookAppointmentHeading: Locator;
    readonly patientSearchField: Locator;
    readonly selectClinicOption: Function;
    readonly clinicsDropdown: Locator;
    readonly clinicSwitchMessage: Locator;
    readonly departmentDropdown: Locator;
    readonly doctorDropdown: Locator;
    readonly selectedDoctorOption: Locator;
    readonly startTimeDropdown: Locator;
    readonly dateInput: Locator;
    readonly createAppointmentButton: Locator;
    readonly appointmentBookedMessage: Locator;
    readonly appointmentCardByPatient: Function;
    readonly listView: Locator;
    readonly calenderViewButtonpage: Locator;
    readonly startVisitSection: Locator;
    readonly allDoctorDropdown: Locator;
    readonly listViewName: Function;


    constructor(page: Page) {
        super(page)
        this.appointmentsTab = page.getByRole('link', { name: 'Appointments', exact: true });
        this.bookAppointmentButton = page.getByRole('button', { name: 'Book Appointment', exact: true });
        this.bookAppointmentHeading = page.getByRole('heading', { name: 'Book Appointment' });
        this.patientSearchField = page.getByRole('textbox', { name: 'Search by name, phone, or MRN...' });
        this.selectClinicOption = (clinicName: string) => page.getByRole('option', { name: clinicName })
        this.clinicsDropdown = page.locator("(//header)[1]/div[2]")
        this.clinicSwitchMessage = page.getByText('Clinic switched')
        this.departmentDropdown = page.getByLabel('Department*')
        this.doctorDropdown = page.locator('#doctor');
        this.selectedDoctorOption = this.doctorDropdown.locator('option:checked');
        this.dateInput = page.getByLabel('Date');
        this.startTimeDropdown = page.getByLabel('Start Time');
        this.createAppointmentButton = page.getByRole('button', { name: 'Book Appointment' })
        this.appointmentBookedMessage = this.page.locator('p').filter({ hasText: 'Appointment Booked' });
        this.appointmentCardByPatient = (patientName: string) => this.page.locator('div[class*="_appointmentCard_"]').filter({ has: this.page.locator('div[class*="_apptPatient_"]', { hasText: patientName }) });
        this.listView = page.getByRole('button', { name: 'List' })
        this.calenderViewButtonpage = page.getByRole('button', { name: 'Calendar' })
        this.startVisitSection = page.locator('strong').filter({ hasText: 'Ready to Start Visit' })
        this.allDoctorDropdown = page.locator('select').filter({
            has: page.locator('option', { hasText: 'All Doctors' })
        });
        this.listViewName = (name: string) => this.page.locator('tbody tr').filter({ hasText: name }).getByText(name);
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
    async selectDoctorDropdown(doctor: string) {
        await this.doctorDropdown.selectOption(doctor)
    }
    async clickCreateAppointmentButton() {
        await this.click(this.createAppointmentButton);
    }
    async selectDate(date: string): Promise<void> {
        await this.dateInput.fill(date);
        await this.dateInput.press('Tab');
        await this.startTimeDropdown.waitFor({ state: 'visible' });
        await this.page.waitForTimeout(1000);
    }
    async selectStartTime(previousTime?: string): Promise<string | null> {
        const options = this.startTimeDropdown.locator('option');
        const count = await options.count();
        for (let i = 0; i < count; i++) {
            const option = options.nth(i);
            const text = (await option.textContent())?.trim();
            const value = await option.getAttribute('value');
            if (!text || !value || await option.isDisabled()) {
                continue;
            }
            if (/select|no slots/i.test(text)) {
                continue;
            }
            if (
                !previousTime ||
                utils.timeToMinutes(text) >=
                utils.timeToMinutes(previousTime) + 30
            ) {
                await this.startTimeDropdown.selectOption({ label: text });
                return text;
            }
        }
        return null;
    }
    async selectNextAppointment(previousTime?: string): Promise<{ date: string; time: string }> {
        for (let days = 0; days < 30; days++) {
            const date = days === 0
                ? utils.getTodayDate()
                : utils.getDateAfterDays(days);
            await this.selectDate(date);
            const time = await this.selectStartTime(previousTime);
            if (time) {
                return {
                    date, time
                };
            }
            console.log(`No slot on ${date}, checking next date...`);
        }
        throw new Error('No appointment slot available for next 30 days');
    }
    async clicklistView() {
        await this.click(this.listView)
    }
    async clickcalenderViewButtonpage() {
        await this.click(this.calenderViewButtonpage)
    }
    async selectAllDoctor(doctorName: string): Promise<void> {
        await this.allDoctorDropdown.selectOption({
            label: doctorName
        });
    }

    // Check if a specific time slot is disabled
    async isTimeSlotDisabled(timeSlot: string): Promise<boolean> {
        const options = this.startTimeDropdown.locator('option');
        const count = await options.count();
        for (let i = 0; i < count; i++) {
            const option = options.nth(i);
            const text = (await option.textContent())?.trim();
            if (text === timeSlot) {
                return await option.isDisabled();
            }
        }
        return false;
    }
    async isTimeSlotAvailable(timeSlot: string): Promise<boolean> {
        const option = this.startTimeDropdown.locator('option', {
            hasText: timeSlot
        });
        return await option.count() > 0;
    }

}