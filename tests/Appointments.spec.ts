
import { test } from "../fixtures/testfixtures";

test.describe("Appointments Page", () => {

    test("Book Appointments Flow", async ({ appointmentsPage }) => {

        await test.step("Navigate to the Appointment Registration Page", async () => {
            await appointmentsPage.clickAppointmentsTab();
            await appointmentsPage.clickBookAppointmentButton();
            await appointmentsPage.expectToBeVisible(appointmentsPage.bookAppointmentHeading);
        })

        await test.step("Fill all Book Appointment Form Fields and Save", async () => {
            await appointmentsPage.searchPatientField("John Doe");
        })
    })

})