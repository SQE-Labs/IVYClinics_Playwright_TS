import { test, expect } from "@playwright/test"
import { LoginPage } from "../pages/LoginPage"
import { ConfigManager } from "../utils/ConfigManager"
import { PatientsPage } from "../pages/PatientsPage"
import { utils } from "../utils/Utility"
import testData from "../test-data/test-data.json";





test.describe("Patients Page", () => {
    const patientName = utils.generateRandomName();
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page)
        await loginPage.goto();
        const credentials = ConfigManager.getCredentials();
        await loginPage.login(credentials.email, credentials.password);
    })
    
    test("IVY_PAT_1,IVY_PAT_11,IVY_PAT_12,Verify that the user is able to fill all fields and than Patient Profile opens successfully", async ({ page }) => {
        const patientsPage = new PatientsPage(page)

        await test.step("Navigate to patient registration page", async () => {
            await patientsPage.clickPatientsTab();
            await patientsPage.clickNewPatientButton();
            await patientsPage.expectToBeVisible(patientsPage.patientRegistrationHeading)

        })
        await test.step("fill ALL fields click on save patient", async () => {
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
            await patientsPage.expectToBeVisible(await patientsPage.getPatientName(patientName))
            await patientsPage.expectToBeVisible(await patientsPage.getphoneFieldLabel(phoneNumber))
            await expect.soft(patientsPage.emailFieldLabel).toHaveText(testData.newPatientForm.email);
            await expect(patientsPage.bloodGroupFieldLabel).toHaveText(testData.newPatientForm.bloodGroup)
            await expect(patientsPage.allergiesFieldLabel).toHaveText(testData.newPatientForm.knownAllergies)



        })
    })
    test("Verify validation message is displayed for an invalid phone number and Verify Book appointment page Appears", async ({ page }) => {
        const patientsPage = new PatientsPage(page)

        await test.step("Navigate to patient registration page", async () => {
            await patientsPage.clickPatientsTab();
            await patientsPage.clickNewPatientButton();
            await patientsPage.expectToBeVisible(patientsPage.patientRegistrationHeading)

        })
        await test.step("Verify that the validation message is displayed for an invalid 10-digit phone number and on first name field for numbers and special characters", async () => {
            await patientsPage.enterFirstNameField(testData.newPatientForm.firstNameTest1);
            await patientsPage.selectGenderField(testData.newPatientForm.gender)
            await patientsPage.selecthowDidYouHearAboutUsDropdown(testData.newPatientForm.howDidYouHearAboutUs)
            await patientsPage.enterPhoneNumberField(testData.newPatientForm.phoneNumbertest1)
            await patientsPage.clickSavePatientButton();
            await expect(patientsPage.firstNameValidationMessage).toContainText("First name can only contain letters, spaces, hyphens, apostrophes, and periods")
            await expect(patientsPage.phoneNumberValidationMessage).toContainText("Enter a valid 10-digit mobile number (e.g. 9876543210, 09876543210, or +91 98765 43210).");

        })
        await test.step("Verify the Indian mobile number validation message after filling all required fields", async () => {
            await patientsPage.phoneNumberField.clear();
            await patientsPage.enterPhoneNumberField(testData.newPatientForm.phoneNumbertest2)
            await patientsPage.clickSavePatientButton();
            await expect(patientsPage.phoneNumberValidationMessage).toContainText("Indian mobile numbers must start with 6, 7, 8 or 9")
        })
        await test.step("verify the  save and book appointment button redirect to book appointment page", async () => {
            await patientsPage.phoneNumberField.clear();
            const phoneNumber = utils.generateRandomPhoneNumber();
            await patientsPage.enterPhoneNumberField(phoneNumber);
            await patientsPage.clicksaveBookAppointmentButton()
            await expect(patientsPage.verifyBookAppointmentHeading).toBeVisible


        })
    })

    test("Verify the Family Sharing flow with an existing phone number and view", async ({ page }) => {

        const patientsPage = new PatientsPage(page)

        await test.step("Navigate to patient registration page", async () => {
            await patientsPage.clickPatientsTab();
            await patientsPage.clickNewPatientButton();
            await patientsPage.expectToBeVisible(patientsPage.patientRegistrationHeading)

        })
        await test.step("fill required fields and click save Patient Button", async () => {
            await patientsPage.enterFirstNameField(patientName);
            await patientsPage.selectGenderField(testData.newPatientForm.gender)
            await patientsPage.selecthowDidYouHearAboutUsDropdown(testData.newPatientForm.howDidYouHearAboutUs)
            const phoneNumber = utils.generateRandomPhoneNumber();
            await patientsPage.enterPhoneNumberField(phoneNumber);
            await patientsPage.clickSavePatientButton();
            await patientsPage.clickBackButton();
            await patientsPage.enterFirstNameField(patientName);
            await patientsPage.selectGenderField(testData.newPatientForm.gender)
            await patientsPage.selecthowDidYouHearAboutUsDropdown(testData.newPatientForm.howDidYouHearAboutUs)
            await patientsPage.enterPhoneNumberField(phoneNumber);
            await patientsPage.clickSavePatientButton();
            await patientsPage.clickAddpatientButton();
            await patientsPage.clickSaveFamilySharingButton();
            await expect(patientsPage.belongsToValidationMessage).toContainText("Please choose whose phone this is")
            await patientsPage.selectphoneBlegongsToDropDown(testData.newPatientForm.phoneBleongsToFieldpopup)
            await patientsPage.clickSaveFamilySharingButton();
            await expect(patientsPage.sharedWithLink).toBeVisible()
        })

    })
    test("Verify view and book appointment button redirect to corresponding page", async ({ page }) => {
        const patientsPage = new PatientsPage(page)

        await test.step("Navigate to patient profile page ", async () => {
            await patientsPage.clickPatientsTab();
            await patientsPage.enterSearchField(patientName);
            await patientsPage.clickViewButton();
            await patientsPage.clickbackButtonPatientProfile()
        })
        await test.step("Navigate to book appointment page ", async () => {
            await patientsPage.enterSearchField(patientName);
            await patientsPage.clickbookButtonPatientprofile();
            console.log("patientName =", patientName);
            await patientsPage.expectToBeVisible(patientsPage.patientCardName(patientName))
        })
    })
    test("Verify medical history get saved", async ({ page }) => {
        const patientsPage = new PatientsPage(page)

        await test.step("Navigate to patient profile page", async () => {
            await patientsPage.clickPatientsTab();
            await patientsPage.enterSearchField(patientName);
            await patientsPage.clickViewButton();
            await patientsPage.clickMedicalHistoryTab();

        })
        await test.step("fill medical history and click save medical history", async () => {
            await patientsPage.selectThyroidConditionDropdown(testData.patientprofile.thyroidCondition)
            await patientsPage.selectbloodPressureDropdown(testData.patientprofile.bloodpressure)
            await patientsPage.enterLastCheckUpDate(testData.patientprofile.lastCheckUpDate)
            await patientsPage.clickDiabetesCheckBox();
            await patientsPage.clickusesTabaccoCheckBox();
            await patientsPage.clickSaveMedicalHistoryButton();
            await expect(patientsPage.successMedicalHistoryMessage).toBeVisible()

        })

    })


})