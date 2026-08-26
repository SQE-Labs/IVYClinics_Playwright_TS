import { test as base, expect } from "@playwright/test";
import { PatientsPage } from "../pages/PatientsPage";
import { AppointmentsPage } from "../pages/AppointmentsPage";
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
    appointmentsPage: AppointmentsPage;
};


export const test = base.extend<MyFixtures>({

    createpatient: async ({ page }, use) => {
        const patientsPage = new PatientsPage(page);

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