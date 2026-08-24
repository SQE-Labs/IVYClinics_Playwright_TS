import { test as base, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { PatientsPage } from "../pages/PatientsPage";
import { AppointmentsPage } from "../pages/AppointmentsPage";
import { ConfigManager } from "../utils/ConfigManager";

type MyFixtures = {
    patientsPage: PatientsPage;
    appointmentsPage: AppointmentsPage;
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

    appointmentsPage: async ({ page }, use) => {

        const loginPage = new LoginPage(page);

        await loginPage.goto();

        const credentials = ConfigManager.getCredentials();

        await loginPage.login(
            credentials.email,
            credentials.password
        );

        const appointmentsPage = new AppointmentsPage(page);

        await use(appointmentsPage);
    }
});

export { expect };