import { test, expect } from '@playwright/test';
import { DashboardPage } from '../pages/DashboardPage';
import { LoginPage } from '../pages/LoginPage';
import { ConfigManager } from '../utils/ConfigManager';
import testData from "../test-data/test-data.json"



test.describe("Dashboard page", () => {

    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        const credentials = ConfigManager.getCredentials();
        await loginPage.login(credentials.email, credentials.password);

    })
    test("IVY_Dash_1, IVY_Dash_2, IVY_Dash_3, IVY_Dash_4, IVY_Dash_5, IVY_Dash_6, Verify all dashboard tiles are displayed and function correctly", async ({ page }) => {
        const dashboardPage = new DashboardPage(page);
        await dashboardPage.waitForDashboard();
        await test.step("click on Patients tile", async () => {
            await dashboardPage.clickPatientsTile();
            page.waitForLoadState();
            await dashboardPage.expectToBeVisible(dashboardPage.patientsPageHeading);
            await page.goBack();

        })
        await test.step("click on Appointments tile", async () => {
            await dashboardPage.clickAppointmentTile();
            await dashboardPage.expectToBeVisible(dashboardPage.appointmentsPageHeading);
            await page.goBack();

        })
        await test.step("click on communications tile", async () => {
            await dashboardPage.clickCommunicationTile();
            await dashboardPage.expectToBeVisible(dashboardPage.communicationsPageHeading);
            await page.goBack();
        })
        await test.step("click on new patient button", async () => {
            await dashboardPage.clickNewPatientButton();
            await dashboardPage.expectToBeVisible(dashboardPage.patientRegistrationPageheading);
            await page.goBack();
        })
        await test.step("click on book appointment button", async () => {
            await dashboardPage.clickBookAppointmentButton();
            await dashboardPage.expectToBeVisible(dashboardPage.bookAppointmentPageheading);
            await page.goBack();
        })

        for (const clinic of testData.dashboard.clinics) {
            await test.step(`Select clinic: ${clinic}`, async () => {
                await dashboardPage.clickClinicsDropdown();
                await dashboardPage.selectClinic(clinic);
                const expectedWelcomeText = `Welcome to ${clinic}. Here's what you can do today.`;
                await expect(dashboardPage.welcomeText).toHaveText(expectedWelcomeText);
            });
        }


    });

});