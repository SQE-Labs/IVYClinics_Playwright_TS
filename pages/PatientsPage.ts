import { Locator, Page } from "@playwright/test";
import { BasePage } from "../base/BasePage"

export class PatientsPage extends BasePage {

    readonly patientsTab: Locator;
    readonly newPatientButton: Locator;
    readonly patientRegistrationHeading: Locator;
    readonly firstNameField: Locator;
    readonly lastNameField: Locator;
    readonly emailField: Locator;
    readonly phoneNumberField: Locator;
    readonly dateField: Locator;
    readonly genderDropdownField: Locator;
    readonly occupationField: Locator;
    readonly CategoryDropdownField: Locator;
    readonly contactTypeDropDownfield: Locator;
    readonly bestTimeToReachDropdownField: Locator;
    readonly AddressField: Locator;
    readonly reasonForVisitField: Locator;
    readonly howDidYouHearAboutUsDropdown: Locator;
    readonly companyNamefield: Locator;
    readonly employeeIDField: Locator;
    readonly priceGroupDropdownField: Locator;
    readonly bloodgroupDropdownField: Locator;
    readonly knownAllergiesField: Locator;
    readonly contactNameField: Locator;
    readonly contactPhoneField: Locator;
    readonly relationshipField: Locator;
    readonly phoneBelongsField: Locator;
    readonly patientConsentCheckbox: Locator;
    readonly savePatientButton: Locator;
    readonly patientNameprofile: Function;
    readonly phoneNumberValidationMessage: Locator;
    readonly backButton: Locator;
    readonly addPatientButton: Locator;
    readonly saveFamilySharingButton: Locator;
    readonly belongsToValidationMessage: Locator;
    readonly phoneBlegongsToDropDown: Locator;
    readonly sharedWithLink: Locator;
    readonly saveBookAppointmentButton: Locator;
    readonly verifyBookAppointmentHeading: Locator;
    readonly emailFieldLabel: Locator;
    readonly bloodGroupFieldLabel: Locator;
    readonly allergiesFieldLabel: Locator;
    readonly searchBoxField: Locator;
    readonly viewButton: Function;
    readonly medicalHistoryTab: Locator;
    readonly thyroidConditionDropdown: Locator;
    readonly bloodPressureDropdown: Locator;
    readonly lastCheckUpDropdown: Locator;
    readonly saveMedicalHistoryButton: Locator;
    readonly successMedicalHistoryMessage: Locator;
    readonly diabetesCheckBox: Locator;
    readonly usesTabaccoCheckBox: Locator;
    readonly phoneFieldLabel: Function;
    readonly firstNameValidationMessage: Locator;
    readonly backButtonPatientProfile: Locator;
    readonly bookButtonPatientprofile: Locator;
    readonly patientCardName: Function;
    readonly usesAlcoholCheckBox: Locator;
    readonly editButton: Locator;
    readonly editSuccessMessage: Locator;
    readonly saveChangesButton: Locator;
    readonly pregnantCheckbox: Locator;
    readonly radioTherapyHistory: Locator;
    readonly reccommendedTreatment: Locator;
    readonly searchTreatmentField: Locator;
    readonly saveReccommendedTreatmentButton: Locator;
    readonly reccommendedTreatments: Locator;
    readonly removeTreatmentButton: Locator;
    readonly secondReccommendedTreatment: Locator;
    readonly successMessageTreatmentUpdate: Locator
    readonly fullName: Locator;
    readonly chracterValidation: Locator;
    readonly investigationsTab: Locator;
    readonly investigationTypeDropdown: Locator;
    readonly uploadFilesButton: Locator;
    readonly lipidProfileButton: Locator;
    readonly viewInlineButton: Locator;
    readonly deleteInlineButton: Locator;
    readonly uploadSuccessMessage: Locator;
    readonly downloadInlineButton: Locator
    readonly deletePopupButton: Locator;
    readonly deleteSuccessMessage: Locator;
    readonly patientNameList: Function;
    readonly mrnLable: Locator;

    constructor(page: Page) {
        super(page)

        this.patientsTab = page.getByRole('link', { name: 'Patients', exact: true })
        this.newPatientButton = page.getByRole('button', { name: 'New Patient' })
        this.patientRegistrationHeading = page.getByRole('heading', { name: 'Patient Registration' })
        this.firstNameField = page.getByRole('textbox', { name: 'First Name*' })
        this.lastNameField = page.getByRole('textbox', { name: 'Last Name' })
        this.phoneNumberField = page.getByRole('textbox', { name: 'Phone Number' })
        this.emailField = page.getByLabel('Email')
        this.dateField = page.getByLabel('Date of Birth')
        this.genderDropdownField = page.getByLabel('Gender*')
        this.occupationField = page.getByRole('textbox', { name: 'Occupation' })
        this.CategoryDropdownField = page.getByRole('combobox', { name: 'Vertical / Category' })
        this.contactTypeDropDownfield = page.getByLabel('Contact Type')
        this.bestTimeToReachDropdownField = page.getByLabel('Best Time to Reach')
        this.AddressField = page.getByLabel('Address')
        this.reasonForVisitField = page.getByLabel('Reason for Visit')
        this.howDidYouHearAboutUsDropdown = page.locator("//select[@id='how-did-you-hear-about-us?']")
        this.companyNamefield = page.getByLabel('Company Name')
        this.employeeIDField = page.getByLabel('Employee ID')
        this.priceGroupDropdownField = page.getByLabel('Price Group')
        this.bloodgroupDropdownField = page.getByLabel('Blood Group')
        this.knownAllergiesField = page.getByLabel('Known Allergies')
        this.contactNameField = page.getByLabel('Contact Name')
        this.contactPhoneField = page.getByLabel('Contact Phone')
        this.relationshipField = page.getByLabel('Relationship')
        this.phoneBelongsField = page.getByLabel('Phone belongs to')
        this.patientConsentCheckbox = page.getByLabel('Patient has read and agreed to the consent form')
        this.savePatientButton = page.getByRole('button', { name: 'Save Patient' })
        this.patientNameprofile = (name: string) => page.getByRole('heading', { name });
        this.phoneNumberValidationMessage = page.locator('#phone-number-error');
        this.backButton = page.getByRole('button', { name: 'Back' })
        this.addPatientButton = page.getByText('Yes, Add Patient', { exact: true })
        this.saveFamilySharingButton = page.locator('span').filter({ hasText: 'Save Patient' }).last()
        this.belongsToValidationMessage = page.getByText('Please choose whose phone this is')
        this.phoneBlegongsToDropDown = page.locator("//div[@class='_holderForm_c0ftr_114']//select[@id='phone-belongs-to']")
        this.sharedWithLink = page.getByRole('link', { name: 'Shared with 1 other patient' })
        this.saveBookAppointmentButton = page.getByRole('button', { name: 'Save & Book Appointment' })
        this.verifyBookAppointmentHeading = page.getByRole('heading', { name: 'Book Appointment' })
        this.emailFieldLabel = page.locator('//span[text()="Email"]/following::span[1]')
        this.bloodGroupFieldLabel = page.locator('//span[text()="Blood Group"]/following::span[2]')
        this.allergiesFieldLabel = page.locator('//span[text()="Allergies"]/following::span[1]')
        this.searchBoxField = page.getByRole('textbox', { name: 'Search by name, phone, or email...' })
        // this.viewButton = page.locator('button').filter({ hasText: 'View' }).first()
        this.mrnLable  = page.locator('//span[text()="MRN"]/following::span[1]')
        this.medicalHistoryTab = page.getByText('Medical History', { exact: true })
        this.thyroidConditionDropdown = page.getByLabel('Thyroid Condition')
        this.bloodPressureDropdown = page.getByLabel('Blood Pressure')
        this.lastCheckUpDropdown = page.getByLabel('Last Checkup Date')
        this.saveMedicalHistoryButton = page.getByRole('button', { name: 'Save Medical History' })
        this.diabetesCheckBox = page.getByLabel('Diabetes')
        this.successMedicalHistoryMessage = page.getByText('Save Medical History')
        this.usesTabaccoCheckBox = page.getByLabel('Uses Tobacco')
        this.phoneFieldLabel = (phone: string) => page.locator("//span[text()='Phone']/following::span[1]")
        this.firstNameValidationMessage = page.locator('#first-name-error')
        this.backButtonPatientProfile = page.getByRole('button', { name: 'Back' })
        this.bookButtonPatientprofile = page.locator('button').filter({ hasText: 'Book' }).first()
        this.patientCardName = (name: string) => page.getByText(name);
        this.usesAlcoholCheckBox = page.getByLabel('Uses Alcohol');
        this.editButton = page.getByText('Edit Patient');
        this.editSuccessMessage = page.getByText("Patient information updated successfully");
        this.saveChangesButton = page.getByText('Save Changes')
        this.pregnantCheckbox = page.getByLabel('Pregnant')
        this.radioTherapyHistory = page.getByLabel('Radiotherapy History')
        this.reccommendedTreatment = page.getByRole('button', { name: 'Recommended Treatment' })
        this.searchTreatmentField = page.getByRole('textbox', { name: 'Search treatments to add...' })
        this.saveReccommendedTreatmentButton = page.getByText('Save', { exact: true })
        this.reccommendedTreatments = page.locator("//span[contains(text(),'Chemical Peel – Salicylic Acid - 8 Sessions - 15% ')]")
        this.secondReccommendedTreatment = page.locator("//span[contains(text(),'Chemical Peel – Salicylic Acid - 4 Sessions - 10% ')]")
        this.removeTreatmentButton = page.locator('button').filter({ hasText: '×' }).first()
        this.successMessageTreatmentUpdate = page.getByRole("alert").filter({ hasText: 'Recommended treatments updated.' })
        this.fullName = page.locator('//dt[normalize-space()="Full Name"]/following-sibling::dd');
        this.chracterValidation = page.locator('#first-name-error');
        this.investigationsTab = page.getByRole('button', { name: 'Investigations' })
        this.investigationTypeDropdown = page.locator('select._select_mircc_22._md_mircc_71');
        this.uploadFilesButton = page.getByRole("button", { name: "Upload Files" });
        this.lipidProfileButton = page.getByRole('button', { name: 'Lipid Profile' })
        this.viewInlineButton = page.getByTitle('View inline');
        this.deleteInlineButton = page.getByTitle('Delete');
        this.uploadSuccessMessage = page.getByRole("alert").filter({ hasText: "uploaded successfully" });
        this.downloadInlineButton = page.getByTitle("Download");
        this.deletePopupButton = page.locator('//div[contains(@class,"_actions_")]//button[.//span[normalize-space()="Delete"]]')
        this.deleteSuccessMessage = this.page.getByRole("alert").filter({ hasText: "deleted." });
        this.patientNameList = (Mrn: string) => this.page.locator("tr").filter({ hasText: Mrn });
        this.viewButton = (Mrn: string) => this.patientNameList(Mrn).getByRole("button", { name: "View" });


    }


    async clickPatientsTab() {
        await this.click(this.patientsTab)
    }
    async clickNewPatientButton() {
        await this.click(this.newPatientButton)

    }
    async enterFirstNameField(firstName: string) {
        await this.fill(this.firstNameField, firstName)

    }
    async enterLastNameField(lastName: string) {
        await this.fill(this.lastNameField, lastName)
    }

    async enterEmailfield(email: string) {
        await this.fill(this.emailField, email)
    }
    async enterDatefield(date: string) {
        await this.dateField.pressSequentially(date)
    }
    async enterPhoneNumberField(phoneNumber: string) {
        await this.fill(this.phoneNumberField, phoneNumber)
    }
    async selectGenderField(gender: string) {
        await this.genderDropdownField.selectOption(gender);

    }
    async enterOccupationField(occupation: string) {
        await this.fill(this.occupationField, occupation)
    }
    async selectCategoryDropdownField(Category: string) {
        await this.CategoryDropdownField.selectOption(Category)
    }
    async selectContactTypeDropdownField(contactType: string) {
        await this.contactTypeDropDownfield.selectOption(contactType)
    }
    async selectbestTimeToReachDropdownField(timeToreach: string) {
        await this.bestTimeToReachDropdownField.selectOption(timeToreach)
    }
    async enterAddressfield(Address: string) {
        await this.fill(this.AddressField, Address)
    }
    async enterReasonForVisit(reason: string) {
        await this.fill(this.reasonForVisitField, reason)
    }
    async selecthowDidYouHearAboutUsDropdown(howDidYouHearAboutUs: string) {
        await this.howDidYouHearAboutUsDropdown.selectOption(howDidYouHearAboutUs)
    }
    async enterCompanyNameField(companyName: string) {
        await this.fill(this.companyNamefield, companyName)
    }
    async enterEmployeeIDField(employeeID: string) {
        await this.fill(this.employeeIDField, employeeID)
    }
    async selectpriceGroupDropdownField(priceGroup: string) {
        await this.priceGroupDropdownField.selectOption(priceGroup)
    }
    async selectbloodgroupDropdownField(bloodGroup: string) {
        await this.bloodgroupDropdownField.selectOption(bloodGroup)
    }
    async enterknownAllergiesField(knownAllergies: string) {
        await this.fill(this.knownAllergiesField, knownAllergies)
    }
    async entercontactNameField(contactName: string) {
        await this.fill(this.contactNameField, contactName)
    }
    async entercontactPhoneField(contactPhone: string) {
        await this.fill(this.contactPhoneField, contactPhone)
    }
    async selectRelationshipDropdownField(relationship: string) {
        await this.relationshipField.selectOption(relationship)
    }
    async enterPhoneBelongsField(phoneBelongs: string) {
        await this.phoneBelongsField.selectOption(phoneBelongs)
    }
    async clickpatientConsentCheckbox() {
        await this.click(this.patientConsentCheckbox)
    }
    async clickSavePatientButton() {
        await this.click(this.savePatientButton)
    }
    async getPatientName(name: string) {
        return this.patientNameprofile(name);
    }
    async clickBackButton() {
        await this.click(this.backButton)
    }
    async clickAddpatientButton() {
        await this.click(this.addPatientButton)
    }
    async clickSaveFamilySharingButton() {
        await this.click(this.saveFamilySharingButton)
    }
    async selectphoneBlegongsToDropDown(phoneBelongsto: string) {
        await this.phoneBlegongsToDropDown.selectOption(phoneBelongsto)

    }
    async clicksaveBookAppointmentButton() {
        await this.click(this.saveBookAppointmentButton)
    }
    async enterSearchField(search: string) {
        await this.fill(this.searchBoxField, search)
    }
    async clickViewButton(Mrn:string) {
        await this.viewButton(Mrn).click();
    }
    async clickMedicalHistoryTab() {
        await this.click(this.medicalHistoryTab)
    }
    async selectThyroidConditionDropdown(thyroidCondition: string) {
        await this.thyroidConditionDropdown.selectOption(thyroidCondition)
    }
    async selectbloodPressureDropdown(bloodpressure: string) {
        await this.bloodPressureDropdown.selectOption(bloodpressure)
    }
    async enterLastCheckUpDate(checkupdate: string) {
        await this.lastCheckUpDropdown.pressSequentially(checkupdate)
    }
    async clickSaveMedicalHistoryButton() {
        await this.click(this.saveMedicalHistoryButton)
    }
    async clickDiabetesCheckBox() {
        await this.click(this.diabetesCheckBox)
    }
    async clickusesTabaccoCheckBox() {
        await this.click(this.usesTabaccoCheckBox)
    }
    async getphoneFieldLabel(phone: string) {
        return this.phoneFieldLabel(phone)
    }
    async clickbackButtonPatientProfile() {
        await this.click(this.backButtonPatientProfile)
    }
    async clickbookButtonPatientprofile() {
        await this.click(this.bookButtonPatientprofile)
    }
    async clickusesAlcoholCheckBox() {
        await this.click(this.usesAlcoholCheckBox)
    }
    async clickEditButton() {
        await this.click(this.editButton)
    }
    async clickSaveChangesButton() {
        await this.click(this.saveChangesButton)
    }
    async clickPregnantCheckbox() {
        await this.click(this.pregnantCheckbox)
    }
    async clickRadioRTherapyHistory() {
        await this.click(this.radioTherapyHistory)
    }
    async clickReccommendedTreatment() {
        await this.click(this.reccommendedTreatment)
    }
    async enterFirstRecommededTreatment(treatment: string) {
        await this.fill(this.searchTreatmentField, treatment)
        await this.reccommendedTreatments.hover();
        await this.reccommendedTreatments.click();

    }
    async enterSecondRecommededTreatment(secondTreatment: string) {
        await this.fill(this.searchTreatmentField, secondTreatment)
        await this.secondReccommendedTreatment.hover();
        await this.secondReccommendedTreatment.click();
    }
    async clickSaveReccommendedTreatmentButton() {
        await this.click(this.saveReccommendedTreatmentButton)
    }
    async clickRemoveTreatment() {
        await this.click(this.removeTreatmentButton)
    }
    async clickInvestigationsTab() {
        await this.click(this.investigationsTab)
    }
    async selectInvestigationTypeDropdown(investigationType: string) {
        await this.investigationTypeDropdown.selectOption({
            label: investigationType
        });
    }
    async uploadFile(filePath: string) {
        const fileChooserPromise = this.page.waitForEvent('filechooser');
        await this.uploadFilesButton.click();
        const fileChooser = await fileChooserPromise;
        await fileChooser.setFiles(filePath);
    }
    async clickLipidProfileButton() {
        await this.click(this.lipidProfileButton)
    }
    async clickViewInlineButton() {
        await this.click(this.viewInlineButton)
    }
    async clickDeleteInlineButton() {
        await this.click(this.deleteInlineButton)
    }
    async clickDownloadInlineButton() {
        const downloadPromise = this.page.waitForEvent("download");
        await this.click(this.downloadInlineButton)
        const download = await downloadPromise;
        return download;
    }
    async clickDeletePopupButton() {
        await this.click(this.deletePopupButton)
    }
    async getPatientNameList(firstName: string) {
        return this.patientNameList(firstName);
    }
    async getMrnLabel(): Promise<string> {
    return await this.mrnLable.innerText();
}

}