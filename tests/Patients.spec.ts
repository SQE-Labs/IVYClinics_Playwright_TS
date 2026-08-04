import { test, expect } from "@playwright/test"
import { LoginPage } from "../pages/LoginPage"
import { ConfigManager } from "../utils/ConfigManager"
import { PatientsPage } from "../pages/PatientsPage"
import { utils } from "../utils/Utility"
import testData from "../test-data/test-data.json";




test.describe("Patients Page", () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page)
        await loginPage.goto();
        const credentials = ConfigManager.getCredentials();
        await loginPage.login(credentials.email, credentials.password);
    })
    test("IVY_PAT_1, IVY_PAT_11,IVY_PAT_12,verify that user is able to add new patient", async ({ page }) => {
        const patientsPage = new PatientsPage(page)

        await test.step("Navigate to patient registration page", async () => {
            await patientsPage.clickPatientsTab();
            await patientsPage.clickNewPatientButton();
            await patientsPage.expectToBeVisible(patientsPage.patientRegistrationHeading)

        })
        await test.step("fill ALL fields", async () => {

            const patientName = utils.generateRandomName();
            await patientsPage.enterFirstNameField(patientName);

            await patientsPage.enterLastNameField(testData.newPatientForm.LastName)


            await patientsPage.enterEmailfield(testData.newPatientForm.email)

            await patientsPage.enterDatefield(testData.newPatientForm.date)
            const phoneNumber = utils.generateRandomPhoneNumber();
            await patientsPage.enterPhoneNumberField(phoneNumber)

            await patientsPage.selectGenderField(testData.newPatientForm.gender)
            await patientsPage.enterOccupationField(testData.newPatientForm.occupation)

            await patientsPage.selectCategoryDropdownField(testData.newPatientForm.category)

            await patientsPage.selectContactTypeDropdownField(testData.newPatientForm.contactType)
            await patientsPage.selectbestTimeToReachDropdownField(testData.newPatientForm.bestTimeToReach)
            await patientsPage.enterAddressfield(testData.newPatientForm.Address)
            await patientsPage.enterReasonForVisit(testData.newPatientForm.reason)
            await patientsPage.selecthowDidYouHearAboutUsDropdown(testData.newPatientForm.howDidYouHearAboutUs)
            await patientsPage.enterCompanyNameField(testData.newPatientForm.companyName)
            await patientsPage.enterEmployeeIDField(testData.newPatientForm.employeeID)
            await patientsPage.selectpriceGroupDropdownField(testData.newPatientForm.priceGroup)
            await patientsPage.selectbloodgroupDropdownField(testData.newPatientForm.bloodGroup)
            await patientsPage.enterknownAllergiesField(testData.newPatientForm.knownAllergies)
            await patientsPage.entercontactNameField(testData.newPatientForm.contactName)
            await patientsPage.entercontactPhoneField(utils.generateRandomPhoneNumber())
            await patientsPage.selectRelationshipDropdownField(testData.newPatientForm.relationship)
            await patientsPage.enterPhoneBelongsField(testData.newPatientForm.phoneBleongsto)
            await patientsPage.clickpatientConsentCheckbox()
            await patientsPage.clickSavePatientButton()
            await expect( await patientsPage.getPatientName(patientName)).toBeVisible();



        })


    })


})
