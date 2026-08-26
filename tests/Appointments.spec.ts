
import { test } from "../fixtures/testfixtures";
import { AppointmentsPage } from "../pages/AppointmentsPage";
import { LoginPage } from "../pages/LoginPage";
import { ConfigManager } from "../utils/ConfigManager";
import testData from "../test-data/test-data.json"

test.describe("Appointments Page", () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        const credentials = ConfigManager.getCredentials();
        await loginPage.login(credentials.email, credentials.password);
    })

    test("Book Appointments Flow", async ({ page, createpatient }) => {
        const appointmentsPage = new AppointmentsPage(page);

        await test.step("Navigate to the Appointment Registration Page", async () => {
            await appointmentsPage.clickAppointmentsTab();
            await appointmentsPage.clickBookAppointmentButton();
            await appointmentsPage.expectToBeVisible(appointmentsPage.bookAppointmentHeading);
        })
        for (const clinic of testData.dashboard.clinics) {
            await test.step(`Select clinic: ${clinic}`, async () => {
                await appointmentsPage.clickClinicsDropdown();
                await appointmentsPage.selectClinic(clinic);
                await appointmentsPage.expectToBeVisible(appointmentsPage.clinicSwitchMessage)
            });
        }


        await test.step("Fill all Book Appointment Form Fields and Save", async () => {
            await appointmentsPage.searchPatientField(createpatient.firstName);
            await appointmentsPage.selectPatientByMrn(createpatient.Mrn);
         //   await appointmentsPage.
        })



    })
})