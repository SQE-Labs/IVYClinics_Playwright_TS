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
    readonly followUpDateValidationMessage: Locator;
    readonly followUpDateField: Locator;
    readonly followUpNoteValidationMessage: Locator;
    readonly followUpNoteField: Locator;
    readonly startTimeValidationMessage: Locator;
    readonly patientNameValidationMessage: Locator;
    readonly treatmentPerformed: Locator;
    readonly secondTreatmentPerformed: Locator;
    readonly asWhenRequiredCheckBox: Locator;
    readonly prescriptionButton: Locator;
    readonly addFirstMedicineButton: Locator;
    readonly medicineSearch: Locator;
    readonly addMedicineButton: Locator;
    readonly finalizePrintButton: Locator;
    readonly billingButton: Locator;
    readonly investigation1Blood: Locator;
    readonly investigation2ImagingLab: Locator;
    readonly lipidProfileBloodTest: Locator;
    readonly removeMedicine: Locator;
    readonly previewButton: Locator;
    readonly printPreviewHeading: Locator;
    readonly closeModalButton: Locator;
    readonly PrescriptionFinalisedSection: Locator;
    readonly savePrecriptionMessage: Locator;
    readonly closeButton: Locator;
    readonly backToVisitButton: Locator;
    readonly createBillHeading: Locator;
    readonly billingPopupButton: Locator;
    readonly treatmentTotals: Locator;
    readonly amountPayable: Locator;
    readonly treatmentRows: Locator;
    readonly additionalBillDiscount: Locator;
    readonly applyButton: Locator;
    readonly businessName: Locator;
    readonly discountReason: Locator;
    readonly billDiscount: Locator;
    readonly rateCard: Locator;
    readonly netAmountPayable: Locator;
    readonly addButton: Locator;
    readonly discountReasonRequiredMessage: Locator;
    readonly finalizeButton : Locator;
    readonly finalizePopUpButton : Locator;
    readonly billFinalizeSection : Locator;


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
        this.rescheduleButton = this.page.getByRole('table').getByRole('button', { name: 'Reschedule' });
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
        this.followUpDateValidationMessage = this.page.locator('#come-back-date-error');
        this.followUpDateField = this.page.getByLabel('Come-back date*')
        this.followUpNoteValidationMessage = this.page.locator('#follow-up-call-note-error');
        this.followUpNoteField = this.page.locator("//input[@id='follow-up-call-note']")
        this.startTimeValidationMessage = this.page.getByText('Please select a time slot')
        this.patientNameValidationMessage = this.page.getByText('Please select a patient');
        this.treatmentPerformed = this.page.getByRole('button', { name: /Chemical Peel – Salicylic Acid ACP ₹/ });
        this.secondTreatmentPerformed = this.page.getByRole('button', { name: /Chemical Peel – Salicylic Acid - 6 Sessions - 15% Discount/ });
        this.asWhenRequiredCheckBox = this.page.locator('label').filter({ hasText: 'As and When Required' })
        this.prescriptionButton = page.getByRole('button', { name: 'Prescription' });
        this.addFirstMedicineButton = page.getByRole('button', { name: 'Add First Medicine' });
        this.medicineSearch = page.getByRole('textbox', { name: 'Search medicine...' });
        this.addMedicineButton = page.getByRole('button', { name: '+ Add Medicine' });
        this.finalizePrintButton = page.getByRole('button', { name: 'Finalize & Print' });
        this.billingButton = page.getByRole('button', { name: 'Billing' });
        this.investigation1Blood = page.getByLabel('Investigation 1BLOOD');
        this.investigation2ImagingLab = page.getByLabel('Investigation 2Imaging Lab');
        this.lipidProfileBloodTest = this.page.getByLabel('Lipid ProfileBlood Tes');
        this.removeMedicine = this.page.getByRole('button', { name: '×Remove' })
        this.previewButton = this.page.getByText('Preview')
        this.printPreviewHeading = this.page.getByRole('heading', { name: 'Print Preview' })
        this.closeModalButton = this.page.getByRole('button', { name: 'Close modal' });
        this.PrescriptionFinalisedSection = this.page.getByText('Prescription finalised')
        this.savePrecriptionMessage = this.page.getByText('Prescription has been saved', { exact: true })
        this.closeButton = this.page.getByText('Close', { exact: true });
        this.backToVisitButton = this.page.getByRole('button', { name: 'Back to Visit' });
        this.billingPopupButton = this.page.getByRole('button', { name: 'Billing' });
        this.createBillHeading = this.page.getByRole('heading', { name: 'Create Bill' })
        this.treatmentTotals = this.page.locator('span').filter({ hasText: /^₹[0-9,]+\.[0-9]{2}$/ });
        this.treatmentRows = this.page.locator('div[class^="_serviceNameCell_"]').locator('../..');
        this.amountPayable = this.page.getByText('Amount Payable', { exact: true }).locator('..').locator('span').nth(1);
        this.additionalBillDiscount = this.page.getByText(/Additional Bill Discount/).locator('..').locator('span').nth(1);
        this.rateCard = this.page.locator('#rate-card');
        this.billDiscount = this.page.locator('#bill-discount');
        this.discountReason = this.page.locator('#discount-reason');
        this.businessName = this.page.getByText('Employee name / ID*')
        this.applyButton = this.page.getByRole('button', { name: 'Apply', exact: true });
        this.netAmountPayable = this.page.getByText('Net Amount Payable', { exact: true }).locator('..').locator('span').nth(1);
        this.addButton = this.page.locator('button').filter({ hasText: '+' }).first();
        this.discountReasonRequiredMessage = page.getByText(
            "Please select a discount reason and enter the required detail before applying the bill discount."
        );
        this.finalizeButton = this.page.getByRole('button', { name: 'Finalize Invoice' })
        this.finalizePopUpButton = this.page.getByText('Finalize', { exact: true })
        this.billFinalizeSection = this.page.getByText('Bill finalized. As Owner, you can still make changes.', { exact: true })
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
    async fillFollowUpDateField(date: string) {
        await this.followUpDateField.pressSequentially(date)
    }
    async fillfolloUpNoteField(Note: string) {
        await this.fill(this.followUpNoteField, Note)
    }
    async selectTreatmentPerformed() {
        await this.click(this.treatmentPerformed);
    }
    async selectFirstTreatmentPerformed() {
        await this.click(this.treatmentPerformed);
    }
    async clickSecondTreatmentPerformed() {
        await this.click(this.secondTreatmentPerformed)
    }
    async clickasWhenRequiredCheckBox() {
        await this.click(this.asWhenRequiredCheckBox)
    }
    async clickPrescription() {
        await this.click(this.prescriptionButton);
    }

    async addFirstMedicine() {
        await this.click(this.addFirstMedicineButton);
    }

    async searchMedicine(medicine: string, index = 0) {
        await this.medicineSearch.nth(index).fill(medicine);
    }

    async selectMedicine(medicine: string) {
        await this.click(
            this.page.getByRole('button', {
                name: medicine
            })
        );
    }

    async clickAddMedicine() {
        await this.click(this.addMedicineButton);
    }

    async clickfinalizePrescription() {
        await this.click(this.finalizePrintButton);
    }


    async clickBilling() {
        await this.click(this.billingButton);
    }
    async clickInvestigation1Blood() {
        await this.click(this.investigation1Blood);
    }

    async clickInvestigation2ImagingLab() {
        await this.click(this.investigation2ImagingLab);
    }

    async clickLipidProfileBloodTest() {
        await this.click(this.lipidProfileBloodTest);
    }
    async clickRemoveMedicine() {
        await this.click(this.removeMedicine)
    }
    async clickPreviewButton() {
        await this.click(this.previewButton)
    }
    async clickCloseModalButton() {
        await this.click(this.closeModalButton);
    }
    async clickCloseButton() {
        await this.click(this.closeButton);
    }
    async clickBackToVisitButton() {
        await this.click(this.backToVisitButton);
    }
    async clickBillingButton() {
        await this.click(this.billingButton);
    }
    async getTreatmentTotal(): Promise<number> {
        const count = await this.treatmentRows.count();

        let treatmentTotal = 0;

        for (let i = 0; i < count; i++) {
            const amounts = this.treatmentRows
                .nth(i)
                .locator('text=/₹[0-9,]+\.[0-9]{2}/');

            const value = await amounts.last().innerText();

            treatmentTotal += Number(
                value.replace(/[₹,\s]/g, '')
            );
        }

        return treatmentTotal;
    }
    async getAmountPayable(): Promise<number> {
        const amountPayableText = await this.amountPayable.innerText();

        return Number(
            amountPayableText.replace(/[₹,\s]/g, '')
        );
    }
    async getAdditionalBillDiscount(): Promise<number> {
        if (await this.page.getByText(/Additional Bill Discount/).count() === 0) {
            return 0;
        }

        const value = await this.additionalBillDiscount.innerText();

        return Number(
            value.replace(/[₹,\s−-]/g, '')
        );
    }
    async selectRateCard(rateCard: string) {
        await this.rateCard.selectOption({ label: rateCard });
    }

    async selectBillDiscount(billDiscount: string) {
        await this.billDiscount.selectOption({ label: billDiscount });
    }

    async selectDiscountReason(discountReason: string) {
        await this.discountReason.selectOption({ label: discountReason });
    }

    async enterBusinessName(businessName: string) {
        await this.businessName.fill(businessName);
    }

    async clickApplyButton() {
        await this.applyButton.click();
    }
    async getNetAmountPayable(): Promise<number> {
        const netAmountPayableText = await this.netAmountPayable.innerText();

        return Number(
            netAmountPayableText.replace(/[₹,\s]/g, '')
        );
    }
    async clickAddButton() {
        await this.addButton.click();
    }
    async clickfinalizeButton(){
        await this.click(this.finalizeButton)
    }
    async clickfinalizePopUpButton(){
        await this.click(this.finalizePopUpButton)
    }

}