import { Locator, Page, } from "@playwright/test";
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
    readonly allStatusDropdown: Locator;
    readonly rescheduleButton: Locator;
    readonly appointmentRescheduledToast: Locator;
    readonly appointmentList: Function;
    readonly appointmentsListTab: Locator;
    readonly rescheduleAppointmentButton: Locator;
    readonly startVisitButton: Locator;
    readonly saveButton: Locator;
    readonly chiefComplaintRequiredToast: Locator;
    readonly chiefComplaintField: Locator;
    readonly HistoryOfPresentIllness: Locator;
    readonly successToast: Locator;
    readonly nextWeekButton: Locator;
    readonly bookAnotherAppointmentButton: Locator;
    readonly DiagnosisField: Locator;
    readonly RecommendedTreatmentField: Locator;
    readonly dateInputListView: Locator;
 


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
        this.allDoctorDropdown = page.locator('select').filter({ has: page.locator('option', { hasText: 'All Doctors' }) });
        this.listViewName = (name: string) => this.page.locator('tbody tr').filter({ hasText: name }).getByText(name);
        this.allStatusDropdown = page.locator('select').filter({ has: page.locator('option', { hasText: 'All Status' }) });
        this.rescheduleButton = page.getByRole('button', { name: 'Reschedule' })
        this.appointmentRescheduledToast = this.page.getByRole('alert').filter({ hasText: 'Appointment Rescheduled' });
        this.appointmentList = (date: string) => page.locator('td').filter({ hasText: date });
        this.appointmentsListTab = page.getByRole('button', { name: 'Appointments' })
        this.rescheduleAppointmentButton = page.getByRole('button', { name: 'Reschedule' })
        this.startVisitButton = page.getByRole('button', { name: 'Start Visit' }).first()
        this.saveButton = page.getByRole('button', { name: 'Save' })
        this.chiefComplaintRequiredToast = page.getByRole('alert').filter({ hasText: 'Chief Complaint is required to save.' });
        this.chiefComplaintField = page.getByRole('textbox', { name: 'Chief Complaint *' })
        this.HistoryOfPresentIllness = page.getByRole('textbox', { name: 'History of Present Illness' })
        this.successToast = page.getByRole('alert').filter({ hasText: 'Pre-treatment saved. New case created.' });
       // this.nextWeekButton = this.page.getByRole('button', { name: /next week/i });
       this.nextWeekButton = page.locator('div._calendarHeader_5kjmu_125').locator('button').nth(1)
        this.bookAnotherAppointmentButton = page.getByRole('button', { name: 'Book Another' })
        this.DiagnosisField = page.getByRole('textbox', { name: 'Diagnosis *' })
        this.RecommendedTreatmentField = page.getByRole('textbox', { name: 'Recommended Treatment / Notes' })
        this.dateInputListView = this.page.locator('input[type="date"]');
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
    async selectAllStatusDropdown(status: string) {
        await this.allStatusDropdown.selectOption(status)
    }
    async clickRescheduleButton() {
        await this.click(this.rescheduleButton);
    }
    async clickAppointmentsListTab() {
        await this.click(this.appointmentsListTab);
    }
    async clickRescheduleAppointmentButton() {
        await this.click(this.rescheduleAppointmentButton);
    }
    async clickStartVisitButton() {
        await this.click(this.startVisitButton);
    }
    async clickSaveButton() {
        await this.click(this.saveButton);
    }
    async fillChiefComplaintField(complaint: string) {
        await this.fill(this.chiefComplaintField, complaint);
    }
    async fillHistoryOfPresentIllnessField(history: string) {
        await this.fill(this.HistoryOfPresentIllness, history);
    }
   async clickAppointmentByPatient(patientName: string, maxWeeks = 12) {
    for (let i = 0; i < maxWeeks; i++) {
        const appointment = this.appointmentCardByPatient(patientName);
        await this.page.waitForTimeout(1000);
        const count = await appointment.count();
        console.log(`Week ${i + 1}: ${patientName} - Found: ${count}`);
        if (count > 0) {
            await appointment.first().click();
            return;
        }
        await this.nextWeekButton.click();
        await this.page.waitForTimeout(1000);
    }
    throw new Error(`Appointment for "${patientName}" not found`);
}
    async fillDiagnosisField(diagnosis: string) {
        await this.fill(this.DiagnosisField, diagnosis);
    }
    async fillRecommendedTreatmentField(treatment: string) {
        await this.fill(this.RecommendedTreatmentField, treatment);
    }
   async selectdateInputListView(date: string) {
        await this.fill(this.dateInputListView, date);
    }

}