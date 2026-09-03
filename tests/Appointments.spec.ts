
import { test, expect } from "../fixtures/testfixtures";
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
    test("IVY_APT_1,IVY_APT_2,IVY_APT_4,IVY_APT_5,IVY_APT_9,Verify that the user is able to successfully book an appointment for a patient", async ({ page, createpatient }) => {
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
            await appointmentsPage.selectDepartmentDropdown(testData.Appointments.bookAppointment.department);
            await appointmentsPage.selectDoctorDropdown(testData.Appointments.bookAppointment.doctor)
            const appointment = await appointmentsPage.selectNextAppointment();
            const appointmentDate = appointment.date;
            const appointmentTime = appointment.time;
            console.log(`Appointment Date: ${appointmentDate}`);
            console.log(`Appointment Time: ${appointmentTime}`);
            expect(appointmentDate).toBeTruthy();
            expect(appointmentTime).toBeTruthy();
            await appointmentsPage.clickCreateAppointmentButton();
            await appointmentsPage.expectToBeVisible(appointmentsPage.appointmentBookedMessage)
            await appointmentsPage.selectAllDoctor(testData.Appointments.bookAppointment.AllDoctor);
            await appointmentsPage.clicklistView()
            await expect(appointmentsPage.listView).toHaveClass(/active/);
            await appointmentsPage.expectToBeVisible(appointmentsPage.listViewName(createpatient.firstName))
            await appointmentsPage.clickcalenderViewButtonpage();
            await appointmentsPage.appointmentCardByPatient(createpatient.firstName).click();
            await appointmentsPage.expectToBeVisible(appointmentsPage.startVisitSection)
        })
    })
    test("Verify that the user cannot book an appointment on the same date and time - slot is disabled", async ({ page, createpatient }) => {
        const appointmentsPage = new AppointmentsPage(page);
        let bookedDate: string = '';
        let bookedTime: string = '';
        await test.step("Navigate to the Appointment Registration Page and book first appointment", async () => {
            await appointmentsPage.clickAppointmentsTab();
            await appointmentsPage.clickBookAppointmentButton();
            await appointmentsPage.expectToBeVisible(appointmentsPage.bookAppointmentHeading);
            for (const clinic of testData.dashboard.clinics) {
                await test.step(`Select clinic: ${clinic}`, async () => {
                    await appointmentsPage.clickClinicsDropdown();
                    await appointmentsPage.selectClinic(clinic);
                });
            }
        })
        await test.step("Book first appointment and capture date and time", async () => {
            await appointmentsPage.searchPatientField(createpatient.firstName);
            await appointmentsPage.selectPatientByMrn(createpatient.Mrn);
            await appointmentsPage.selectDepartmentDropdown(testData.Appointments.bookAppointment.department);
            await appointmentsPage.selectDoctorDropdown(testData.Appointments.bookAppointment.doctor)
            const appointment = await appointmentsPage.selectNextAppointment();
            bookedDate = appointment.date;
            bookedTime = appointment.time;
            console.log(`First Appointment - Date: ${bookedDate}, Time: ${bookedTime}`);
            expect(bookedDate).toBeTruthy();
            expect(bookedTime).toBeTruthy();
            await appointmentsPage.clickCreateAppointmentButton();
            await appointmentsPage.expectToBeVisible(appointmentsPage.appointmentBookedMessage)
        })
        await test.step("Navigate back to book another appointment", async () => {
            await appointmentsPage.clickAppointmentsTab();
            await appointmentsPage.clickBookAppointmentButton();
            await appointmentsPage.expectToBeVisible(appointmentsPage.bookAppointmentHeading);
            for (const clinic of testData.dashboard.clinics) {
                await test.step(`Select clinic: ${clinic}`, async () => {
                    await appointmentsPage.clickClinicsDropdown();
                    await appointmentsPage.selectClinic(clinic);
                })
            }
        })
        await test.step("Attempt to book appointment on same date and time - verify slot is disabled", async () => {
            await appointmentsPage.searchPatientField(createpatient.firstName);
            await appointmentsPage.selectPatientByMrn(createpatient.Mrn);
            await appointmentsPage.selectDepartmentDropdown(testData.Appointments.bookAppointment.department);
            await appointmentsPage.selectDoctorDropdown(testData.Appointments.bookAppointment.doctor)
            await appointmentsPage.selectDate(bookedDate);
            const isAvailable = await appointmentsPage.isTimeSlotAvailable(bookedTime);
            expect(isAvailable).toBe(false);
        })
    })
})