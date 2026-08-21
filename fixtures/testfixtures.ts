import { test as base, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { PatientsPage } from "../pages/PatientsPage";
import { ConfigManager } from "../utils/ConfigManager";
import { utils } from "../utils/Utility";
import testData from "../test-data/test-data.json";

type MyFixtures = {
    patientsPage: PatientsPage;
    createpatient: {
        firstName: string;
        phoneNumber: string;
        gender: string;
        howDidYouHearAboutUs: string;
        Mrn: string
    };
};

export const test = base.extend<MyFixtures>({

    patientsPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);

        await loginPage.goto();

        const credentials = ConfigManager.getCredentials();

        await loginPage.login(
            credentials.email,
            credentials.password
        );

        const patientsPage = new PatientsPage(page);

        await use(patientsPage);
    },

    createpatient: async ({ patientsPage }, use) => {

        const firstName = utils.generateRandomName();
        const phoneNumber = utils.generateRandomPhoneNumber();

        await patientsPage.clickPatientsTab();
        await patientsPage.clickNewPatientButton();

        await patientsPage.enterFirstNameField(firstName);

        await patientsPage.enterPhoneNumberField(phoneNumber);
        const gender = testData.newPatientForm.gender
        await patientsPage.selectGenderField(
            gender
        );
        const howDidYouHearAboutUs =
            testData.newPatientForm.howDidYouHearAboutUs;
        await patientsPage.selecthowDidYouHearAboutUsDropdown(
            howDidYouHearAboutUs
        );

        await patientsPage.clickpatientConsentCheckbox();
        await patientsPage.clickSavePatientButton();
        const Mrn = await patientsPage.getMrnLabel();

        await use({
            firstName,
            phoneNumber,
            gender,
            howDidYouHearAboutUs,
            Mrn
        });
    },
});

export { expect };