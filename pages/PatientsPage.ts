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
    readonly patientName: Function;



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
        this.patientName = (name: string) => page.getByRole('heading', { name });


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
    return this.patientName(name);
}

}