
import { test, expect } from "../fixtures/testfixtures";
import { AppointmentsPage } from "../pages/AppointmentsPage";
import testData from "../test-data/test-data.json"

test.describe("Appointments Page", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("/appointments");
    })
    //positive test cases
    test("IVY_APT_1,IVY_APT_2,IVY_APT_3,IVY_APT_4,IVY_APT_5,IVY_APT_6,IVY_APT_9,IVY_APT_10,IVY_APT_11,IVY_APT_12,IVY_APT_18,IVY_APT_19,IVY_APT_20,IVY_APT_21,IVY_APT_25,IVY_APT_29,IVY_APT_30,IVY_PAT_65,IVY_APT_43 IVY_PAT_68,IVY_PAT_69,IVY_PAT_71,IVY_APT_48 IVY_APT_61,IVY_APT_27 @doctor-Verify that the user is able to successfully book an appointment for a patient and reshedule it", async ({ page, createpatient }) => {
        const appointmentsPage = new AppointmentsPage(page);
        const role = process.env.USER_TYPE!;
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
            expect(appointmentDate, "Expected the selected appointment date to be captured before creating the appointment.").toBeTruthy();
            expect(appointmentTime, "Expected the selected appointment time to be captured before creating the appointment.").toBeTruthy();
            await appointmentsPage.clickCreateAppointmentButton();
            await appointmentsPage.expectToBeVisible(appointmentsPage.appointmentBookedMessage)
            await appointmentsPage.verifyAllDoctorDropdownByRole(
                testData.Appointments.bookAppointment.AllDoctor
            );
            await appointmentsPage.selectAllStatusDropdown(testData.Appointments.bookAppointment.AllStatus);
            await appointmentsPage.clicklistView()
            await expect(appointmentsPage.listView, "Expected the list view toggle to become active after selecting it for appointment results.").toHaveClass(/active/);
            await appointmentsPage.selectdateInputListView(appointmentDate);
            await appointmentsPage.expectToBeVisible(appointmentsPage.listViewName(createpatient.firstName))
            await appointmentsPage.clickcalenderViewButtonpage();
            await appointmentsPage.clickAppointmentByPatient(createpatient.firstName)
            await appointmentsPage.expectToBeVisible(appointmentsPage.bookAnotherAppointmentButton)
            await appointmentsPage.verifyStartVisitByRole(role);
        })
        await test.step("Reschedule the booked appointment by selecting a new date and time.", async () => {
            await appointmentsPage.clickAppointmentsListTab();
            await appointmentsPage.clickRescheduleButton();
            await appointmentsPage.selectDepartmentDropdown(testData.Appointments.bookAppointment.department);
            await appointmentsPage.selectDoctorDropdown(testData.Appointments.bookAppointment.doctor)
            const appointment = await appointmentsPage.selectNextAppointment();
            const appointmentDate = appointment.date;
            const appointmentTime = appointment.time;
            expect(appointmentDate, "Expected the rescheduled appointment date to be selected before saving the reschedule.").toBeTruthy();
            expect(appointmentTime, "Expected the rescheduled appointment time to be selected before saving the reschedule.").toBeTruthy();
            await appointmentsPage.clickRescheduleAppointmentButton();
            await expect(appointmentsPage.appointmentRescheduledToast, "Expected the appointment rescheduled success toast to appear after confirming the new time.").toBeVisible();
        })
    })
    //Negative Test Case
    test(" IVY_APT_49 @doctor Verify that Validation Message appear when user try to submit empty form", async ({ page }) => {
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
        await test.step("click Save and validate Message", async () => {
            await appointmentsPage.selectDepartmentDropdown(testData.Appointments.bookAppointment.department);
            await appointmentsPage.selectDoctorDropdown(testData.Appointments.bookAppointment.doctor)
            const appointment = await appointmentsPage.selectNextAppointment();
            const appointmentDate = appointment.date;
            const appointmentTime = appointment.time;
            console.log(`Appointment Date: ${appointmentDate}`);
            console.log(`Appointment Time: ${appointmentTime}`);
            await appointmentsPage.clickCreateAppointmentButton();
            await expect(appointmentsPage.patientNameValidationMessage, "Expected the Validation Message to appear on patient Name Field.").toBeVisible();

        })
    })
    //Negative test cases
    test("IVY_APT_45,IVY_APT_15 @doctor ,IVY_APT_28,@receptionist Verify that the user cannot book an appointment on the same date and time - slot is disabled", async ({ page, createpatient }) => {
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
            expect(bookedDate, "Expected the first appointment date to be captured so the duplicate slot check can be validated.").toBeTruthy();
            expect(bookedTime, "Expected the first appointment time to be captured so the duplicate slot check can be validated.").toBeTruthy();
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
            expect(isAvailable, "Expected the duplicate date and time slot to be unavailable because the same appointment must be blocked.").toBe(false);
        })
    })
    //Negative test cases
    test("IVY_APT_44, @doctor ,@receptionist tVerify that the user can't reschedule an existing appointment to the same date and time", async ({ page, createpatient }) => {
        const appointmentsPage = new AppointmentsPage(page);
        let bookedDate: string = "";
        let bookedTime: string = "";
        await test.step("Navigate to the Appointment Registration Page", async () => {
            await appointmentsPage.clickAppointmentsTab();
            await appointmentsPage.clickBookAppointmentButton();
            await appointmentsPage.expectToBeVisible(
                appointmentsPage.bookAppointmentHeading
            );
        });
        for (const clinic of testData.dashboard.clinics) {
            await test.step(`Select clinic: ${clinic}`, async () => {
                await appointmentsPage.clickClinicsDropdown();
                await appointmentsPage.selectClinic(clinic);
                await appointmentsPage.expectToBeVisible(
                    appointmentsPage.clinicSwitchMessage
                );
            });
        }
        await test.step("Book the first appointment", async () => {
            await appointmentsPage.searchPatientField(createpatient.firstName);
            await appointmentsPage.selectPatientByMrn(createpatient.Mrn);
            await appointmentsPage.selectDepartmentDropdown(
                testData.Appointments.bookAppointment.department
            );
            await appointmentsPage.selectDoctorDropdown(
                testData.Appointments.bookAppointment.doctor
            );
            const appointment = await appointmentsPage.selectNextAppointment();
            bookedDate = appointment.date;
            bookedTime = appointment.time;
            console.log(`Booked Appointment Date: ${bookedDate}`);
            console.log(`Booked Appointment Time: ${bookedTime}`);
            expect(bookedDate, "Expected the booked appointment date to be captured before validating the duplicate reschedule slot.").toBeTruthy();
            expect(bookedTime, "Expected the booked appointment time to be captured before validating the duplicate reschedule slot.").toBeTruthy();
            await appointmentsPage.clickCreateAppointmentButton();
            await appointmentsPage.expectToBeVisible(
                appointmentsPage.appointmentBookedMessage
            );
        });
        await test.step("Open the booked appointment", async () => {
            await appointmentsPage.verifyAllDoctorDropdownByRole(
                testData.Appointments.bookAppointment.AllDoctor
            );
            await appointmentsPage.selectAllStatusDropdown(
                testData.Appointments.bookAppointment.AllStatus
            );
            await appointmentsPage.clicklistView();
            await appointmentsPage.clickcalenderViewButtonpage();
            await appointmentsPage
                .appointmentCardByPatient(createpatient.firstName)
                .click();
            await appointmentsPage.expectToBeVisible(
                appointmentsPage.startVisitSection
            );
        });
        await test.step("select same date and time during rescheduling", async () => {
            await appointmentsPage.clickAppointmentsListTab();
            await appointmentsPage.clickRescheduleButton();

            await appointmentsPage.selectDepartmentDropdown(
                testData.Appointments.bookAppointment.department
            );
            await appointmentsPage.selectDoctorDropdown(
                testData.Appointments.bookAppointment.doctor
            );
            await appointmentsPage.selectDate(bookedDate);
            const isAvailable = await appointmentsPage.isTimeSlotAvailable(bookedTime);
            expect(isAvailable, "Expected the same date and time to remain unavailable when rescheduling to prevent duplicates.").toBe(false);
        });
    });
    //Positive test cases
    test("IVY_APT_46,IVY_PAT_70,IVY_APT_52,IVY_APT_53,IVY_APT_55,IVY_APT_57,IVY_APT_56,IVY_APT_59,IVY_APT_58verify that user is able to start visit on booked appointment", async ({ page, createpatient }) => {
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
            expect(appointmentDate, "Expected the booking date to be selected before creating the appointment.").toBeTruthy();
            expect(appointmentTime, "Expected the booking time to be selected before creating the appointment.").toBeTruthy();
            await appointmentsPage.clickCreateAppointmentButton();
            await appointmentsPage.expectToBeVisible(appointmentsPage.appointmentBookedMessage)
            await appointmentsPage.verifyAllDoctorDropdownByRole(testData.Appointments.bookAppointment.AllDoctor);
            await appointmentsPage.selectAllStatusDropdown(testData.Appointments.bookAppointment.AllStatus);
            await appointmentsPage.clickcalenderViewButtonpage();
            await appointmentsPage.clickAppointmentByPatient(createpatient.firstName)
            await appointmentsPage.expectToBeVisible(appointmentsPage.startVisitSection)
        })
        await test.step("start visit flow ", async () => {
            await appointmentsPage.clickAppointmentsListTab();
            await appointmentsPage.clickStartVisitButton();
            await appointmentsPage.fillChiefComplaintField(testData.Appointments.startvisit.complaint);
            await appointmentsPage.fillHistoryOfPresentIllnessField(testData.Appointments.startvisit.historyIllness);
            await appointmentsPage.clickSaveButton();
            await expect(appointmentsPage.successToast, "Expected the visit creation success toast to appear after saving the appointment details.").toBeVisible();
            await appointmentsPage.clickPrescription();
            await appointmentsPage.addFirstMedicine();
            await appointmentsPage.searchMedicine(testData.Appointments.Prescription.searchMedicine);
            await appointmentsPage.selectMedicine(testData.Appointments.Prescription.selectMedicine);
            await appointmentsPage.clickAddMedicine();
            await appointmentsPage.clickAddMedicine();
            await appointmentsPage.searchMedicine(testData.Appointments.Prescription.searchSecondMedicine, 1);
            await appointmentsPage.selectMedicine(testData.Appointments.Prescription.selectSecondMedicine);
            await appointmentsPage.clickInvestigation1Blood();
            await appointmentsPage.clickInvestigation2ImagingLab();
            await appointmentsPage.clickLipidProfileBloodTest();
            await appointmentsPage.clickPreviewButton();
            await expect(appointmentsPage.printPreviewHeading, "Expected PrintPreview should be visible .").toBeVisible();
            await appointmentsPage.clickCloseModalButton();
            await appointmentsPage.clickfinalizePrescription();
            await expect(appointmentsPage.savePrecriptionMessage, " Expected PrescriptionFinalised dialog should be Visible .").toBeVisible();
            await appointmentsPage.clickCloseButton();
            await expect(appointmentsPage.PrescriptionFinalisedSection, " Expected PrescriptionFinalised Toast to be visible .").toBeVisible();
            await appointmentsPage.clickBackToVisitButton();
            await appointmentsPage.fillDiagnosisField(testData.Appointments.startvisit.diagnosis);
            await appointmentsPage.fillRecommendedTreatmentField(testData.Appointments.startvisit.recommendedTreatmentNotes);
            await appointmentsPage.selectFirstTreatmentPerformed()
            await appointmentsPage.clickSecondTreatmentPerformed();
            await appointmentsPage.clickasWhenRequiredCheckBox();
            await appointmentsPage.clickSaveButton();
            await appointmentsPage.clickBillingButton();
            await expect(appointmentsPage.createBillHeading, " Expected CreateBill Page should be Visible .").toBeVisible();
        })
    })
    //Negative test cases
    test("IVY_APT_47,IVY_APT_50 ,IVY_APT_51 Verify that validation message appears for required fields on start visit", async ({ page, createpatient }) => {
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
            expect(appointmentDate, "Expected the booked appointment date to be captured before validating the required visit fields.").toBeTruthy();
            expect(appointmentTime, "Expected the booked appointment time to be captured before validating the required visit fields.").toBeTruthy();
            await appointmentsPage.clickCreateAppointmentButton();
            await appointmentsPage.expectToBeVisible(appointmentsPage.appointmentBookedMessage)
            await appointmentsPage.verifyAllDoctorDropdownByRole(testData.Appointments.bookAppointment.AllDoctor);
            await appointmentsPage.selectAllStatusDropdown(testData.Appointments.bookAppointment.AllStatus);
            await appointmentsPage.clickcalenderViewButtonpage();
            await appointmentsPage.clickAppointmentByPatient(createpatient.firstName)
            await appointmentsPage.expectToBeVisible(appointmentsPage.startVisitSection)
        })
        await test.step("start visit flow", async () => {
            await appointmentsPage.clickAppointmentsListTab();
            await appointmentsPage.clickStartVisitButton();
            await appointmentsPage.clickSaveButton();
            await expect(appointmentsPage.chiefComplaintRequiredToast, "Expected the required chief complaint validation message to appear when the field is left empty.").toBeVisible();
            await appointmentsPage.fillChiefComplaintField(testData.Appointments.startvisit.complaint);
            await appointmentsPage.clickSaveButton();
            await appointmentsPage.selectFirstTreatmentPerformed()
            await appointmentsPage.clickSecondTreatmentPerformed();
            await appointmentsPage.clickSaveButton();
            await expect(appointmentsPage.followUpDateValidationMessage, "Expected the required Follow-up Date validation message to appear when the field is left empty.").toBeVisible();
            await appointmentsPage.fillFollowUpDateField(testData.Appointments.startvisit.FollowUpDate)
            await appointmentsPage.clickSaveButton();
            await expect(appointmentsPage.followUpNoteValidationMessage, "Expected the required Follow-up Note validation message to appear when the field is left empty.").toBeVisible();
            await appointmentsPage.fillfolloUpNoteField(testData.Appointments.startvisit.FollowUpNote)
            await appointmentsPage.clickSaveButton();
            await appointmentsPage.clickBillingButton();
            await expect(appointmentsPage.createBillHeading, " Expected CreateBill Page should be Visible .").toBeVisible();
        })
    })
})