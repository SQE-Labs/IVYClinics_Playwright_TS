
import { utils } from "../utils/Utility"
import testData from "../test-data/test-data.json";
import { test, expect } from "../fixtures/testfixtures";





test.describe("Patients Page", () => {

    test("IVY_PAT_1, IVY_PAT_11, IVY_PAT_12,IVY_PAT_11,IVY_PAT_24,IVY_PAT_26,IVY_PAT_29,IVY_PAT_31,IVY_PAT_34,IVY_PAT_36,IVY_PAT_40,IVY_PAT_61 - Verify that a user can create a patient and validate details ", async ({ patientsPage }) => {

        await test.step("Navigate to the Patient Registration page", async () => {
            await patientsPage.clickPatientsTab();
            await patientsPage.clickNewPatientButton();
            await patientsPage.expectToBeVisible(patientsPage.patientRegistrationHeading)

        })
        await test.step("Enter valid patient details and save the patient", async () => {
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
            await patientsPage.expectToBeVisible(await patientsPage.getPatientName(patientName))
            await patientsPage.expectToBeVisible(await patientsPage.getphoneFieldLabel(phoneNumber))
            await expect.soft(patientsPage.emailFieldLabel).toHaveText(testData.newPatientForm.email);
            await expect(patientsPage.bloodGroupFieldLabel).toHaveText(testData.newPatientForm.bloodGroup)
            await expect(patientsPage.allergiesFieldLabel).toHaveText(testData.newPatientForm.knownAllergies)


        })
    })
    test("IVY_PAT_2,IVY_PAT_5,IVY_PAT_62,search saved patient and verify view,book appointment button redirected to corresponding page.", async ({ patientsPage, createpatient }) => {


        await test.step(" search and Navigate to patient profile page ", async () => {
            await patientsPage.clickPatientsTab();
            console.log(createpatient.firstName)
            await patientsPage.enterSearchField(createpatient.Mrn);
            await patientsPage.clickViewButton(createpatient.Mrn);
            await patientsPage.clickbackButtonPatientProfile()
        })
        await test.step("Navigate to book appointment page ", async () => {
            await patientsPage.enterSearchField(createpatient.Mrn);
            await patientsPage.clickbookButtonPatientprofile();
            await patientsPage.expectToBeVisible(patientsPage.patientCardName(createpatient.Mrn))
        })

    })
    test(" IVY_PAT_63,Verify user can edit and update form details successfully.", async ({ patientsPage, createpatient }) => {


        await test.step("Navigate to the patient profile and open the Edit form", async () => {
            await patientsPage.clickPatientsTab();
            await patientsPage.clickViewButton(createpatient.Mrn);
            await patientsPage.clickEditButton();

        })
        await test.step("Update the patient information and save the changes", async () => {
            await patientsPage.enterFirstNameField(testData.patientprofile.patientDetails.firstNameTest3);
            await patientsPage.enterEmailfield(testData.newPatientForm.email2)
            await patientsPage.clickSaveChangesButton()
            await patientsPage.expectToBeVisible(patientsPage.editSuccessMessage)
            await expect(patientsPage.fullName).toContainText(testData.patientprofile.patientDetails.firstNameTest3);
            await expect(patientsPage.emailFieldLabel).toContainText(testData.newPatientForm.email2);
        })



    })


    test("IVY_PAT_13,IVY_PAT_16,IVY_PAT_17, IVY_PAT_23 Verify validation message is displayed and Verify Book appointment page Appears ", async ({ patientsPage }) => {

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
        await test.step("Verify the Indian mobile number and first name character validation message after filling all required fields", async () => {
            await patientsPage.firstNameField.clear();
            await patientsPage.phoneNumberField.clear();
            await patientsPage.enterFirstNameField(testData.newPatientForm.firstNameTest2)
            await patientsPage.enterPhoneNumberField(testData.newPatientForm.phoneNumbertest2)
            await patientsPage.clickSavePatientButton();
            await expect(patientsPage.chracterValidation).toContainText("First name must not exceed 100 characters")
            await expect(patientsPage.phoneNumberValidationMessage).toContainText("Indian mobile numbers must start with 6, 7, 8 or 9")
        })
        await test.step("verify the  save and book appointment button redirect to book appointment page", async () => {
            await patientsPage.phoneNumberField.clear();
            await patientsPage.firstNameField.clear();
            const patientName = utils.generateRandomName();
            await patientsPage.enterFirstNameField(patientName);
            const phoneNumber = utils.generateRandomPhoneNumber();
            await patientsPage.enterPhoneNumberField(phoneNumber);
            await patientsPage.clicksaveBookAppointmentButton()
            await expect(patientsPage.verifyBookAppointmentHeading).toBeVisible();
        })
    })


    test("IVY_PAT_20,IVY_PAT_21, IVY_PAT_64,Verify the Family Sharing flow with an existing phone number ", async ({ patientsPage, createpatient }) => {

        await test.step("Navigate to patient registration page", async () => {
            await patientsPage.clickPatientsTab();
            await patientsPage.clickNewPatientButton();
            await patientsPage.expectToBeVisible(patientsPage.patientRegistrationHeading)
        })
        await test.step("fill required fields and click save Patient Button", async () => {
            await patientsPage.enterFirstNameField(createpatient.firstName);
            await patientsPage.selectGenderField(testData.newPatientForm.gender)
            await patientsPage.selecthowDidYouHearAboutUsDropdown(testData.newPatientForm.howDidYouHearAboutUs)
            await patientsPage.enterPhoneNumberField(createpatient.phoneNumber);
            await patientsPage.clickSavePatientButton();
            await patientsPage.clickAddpatientButton();
            await patientsPage.clickSaveFamilySharingButton();
            await expect(patientsPage.belongsToValidationMessage).toContainText("Please choose whose phone this is")
            await patientsPage.selectphoneBlegongsToDropDown(testData.newPatientForm.phoneBleongsToFieldpopup)
            await patientsPage.clickSaveFamilySharingButton();
            await expect(patientsPage.sharedWithLink).toBeVisible()
        })
    })

    test("Verify medical history got saved and recommended treatment get saved and deleted ", async ({ patientsPage, createpatient }) => {

        await test.step("add new patient and navigate to medical history tab", async () => {
            await patientsPage.clickPatientsTab();
            await patientsPage.enterSearchField(createpatient.Mrn);
            await patientsPage.clickViewButton(createpatient.Mrn);
            await patientsPage.clickMedicalHistoryTab();

        })
        await test.step("fill medical history and click save medical history", async () => {
            await patientsPage.selectThyroidConditionDropdown(testData.patientprofile.medicalHistory.thyroidCondition)
            await patientsPage.selectbloodPressureDropdown(testData.patientprofile.medicalHistory.bloodpressure)
            await patientsPage.enterLastCheckUpDate(testData.patientprofile.medicalHistory.lastCheckUpDate)
            await patientsPage.clickDiabetesCheckBox();
            await patientsPage.clickusesTabaccoCheckBox();
            await patientsPage.clickusesAlcoholCheckBox();
            await patientsPage.clickPregnantCheckbox();
            await patientsPage.clickRadioRTherapyHistory();
            await patientsPage.clickSaveMedicalHistoryButton();
            await expect(patientsPage.successMedicalHistoryMessage).toBeVisible()

        })
        await test.step("Verify recommeded treatment got selected and deleted ", async ({ }) => {
            await patientsPage.clickReccommendedTreatment();
            await patientsPage.enterFirstRecommededTreatment(testData.patientprofile.recommededTreatment.treatment)
            await patientsPage.clickSaveReccommendedTreatmentButton();
            await expect(patientsPage.successMessageTreatmentUpdate).toContainText("Recommended treatments updated.");
            await patientsPage.enterSecondRecommededTreatment(testData.patientprofile.recommededTreatment.treatment)
            await patientsPage.clickRemoveTreatment();
            await patientsPage.clickSaveReccommendedTreatmentButton();
            await expect(patientsPage.successMessageTreatmentUpdate).toContainText("Recommended treatments updated.");
        })
    })

    test("Verify that users can upload investigation files, sort the files correctly, and delete the uploaded files successfully.", async ({ patientsPage, createpatient }) => {

        await test.step("Navigate to the patient profile and open the Investigations tab", async () => {
            await patientsPage.clickPatientsTab();
            await patientsPage.enterSearchField(createpatient.Mrn);
            await patientsPage.clickViewButton(createpatient.Mrn);
            await patientsPage.clickInvestigationsTab();
        });

        await test.step("Select the investigation type and upload the file", async () => {
            await patientsPage.selectInvestigationTypeDropdown(testData.patientprofile.investigations.investigationType);
            await patientsPage.uploadFile(
                testData.patientprofile.investigations.file
            );
            await expect(patientsPage.uploadSuccessMessage).toBeVisible();
        });

        await test.step("Download the uploaded investigation file and verify the filename", async () => {
            await patientsPage.clickLipidProfileButton();
            const download = await patientsPage.clickDownloadInlineButton();
            expect(download.suggestedFilename()).toBe("TestFileTS.pdf");
        });

        await test.step("Delete the uploaded investigation file and verify deletion", async () => {
            await patientsPage.clickDeleteInlineButton();
            await patientsPage.clickDeletePopupButton();

            await expect(patientsPage.deleteSuccessMessage).toBeVisible();
        });
    });
    test("Verify that user can create plan ,cancel it and complete it and validate status", async ({ patientsPage, createpatient }) => {


        await test.step("Navigate to patient profile page ", async () => {
            await patientsPage.clickPatientsTab()
            await patientsPage.enterSearchField(createpatient.Mrn);
            await patientsPage.clickViewButton(createpatient.Mrn);
        })

        await test.step("Navigate to Treatment Plans and open the Create Plan form", async () => {
            await patientsPage.clickTreatmentPlansTab();
            await patientsPage.clickCreatePlanButton();
        });

        await test.step("Enter treatment plan details and validate treatment selection", async () => {
            const planName = testData.patientprofile.treatmentPlan.firstName;

            await patientsPage.enterPlanNameField(planName);
            await patientsPage.enterDescriptionField(
                testData.patientprofile.treatmentPlan.description
            );
            await patientsPage.clickpopupCreatePlanButton();

            await expect(patientsPage.searchValidationMessage)
                .toHaveText("Select a treatment");
        });

        await test.step("Add the first treatment with tooth and notes details", async () => {
            await patientsPage.clickAddItemButton();

            const firstTreatment =
                testData.patientprofile.treatmentPlan.firstTreatment;
            await patientsPage.enterFirstTreatmentPlan(firstTreatment);
            await patientsPage.entertoothField(
                testData.patientprofile.treatmentPlan.tooth
            );
            await patientsPage.enterNotesField(
                testData.patientprofile.treatmentPlan.Notes
            );
        });

        await test.step("Add the second treatment", async () => {
            const secondTreatment =
                testData.patientprofile.treatmentPlan.secondTreatment;
            await patientsPage.enterSecondTreatmentPlan(secondTreatment);
        });

        await test.step("Create the treatment plan and verify successful creation", async () => {
            const planName = testData.patientprofile.treatmentPlan.firstName;
            await patientsPage.clickpopupCreatePlanButton();
            await patientsPage.expectToBeVisible(patientsPage.treatmentPlanCreatedMessage);
            await expect(patientsPage.planStatus(planName)).toHaveText("Active");
        });

        await test.step("Verify the treatments are added to treatment plan and status change accordingly", async () => {
            const planName = testData.patientprofile.treatmentPlan.firstName;
            const firstTreatment = testData.patientprofile.treatmentPlan.firstTreatment;
            const secondTreatment = testData.patientprofile.treatmentPlan.secondTreatment;
            await patientsPage.clickPlanCard(planName);
            await expect(patientsPage.firstTreatmentDetail(firstTreatment)).toContainText(firstTreatment);
            await expect(patientsPage.secondTreatmentDetail(secondTreatment)).toContainText(secondTreatment);
            await patientsPage.clickMarkCompletedButton();
            await patientsPage.clickYesComplete();
            await patientsPage.clickpopupCloseButton();
            await expect(patientsPage.planStatus(planName)).toHaveText("Completed");
            await patientsPage.clickPlanCard(planName);
            await patientsPage.clickCancelPlanButton();
            await patientsPage.clickyesCancelPlan();
            await patientsPage.clickpopupCloseButton();
            await expect(patientsPage.planStatus(planName)).toHaveText("Cancelled");
        });

    })



})
