
import { utils } from "../utils/Utility"
import testData from "../test-data/test-data.json";
import { test, expect } from "../fixtures/testfixtures";
import { PatientsPage } from "../pages/PatientsPage";


test.describe("Patients Page", () => {
    test.beforeEach(async ({ page }) => {
         await page.goto("/patients");
    })
    //positive test cases
    test(" @doctor,IVY_PAT_1, IVY_PAT_11, IVY_PAT_12,IVY_PAT_11,IVY_PAT_24,IVY_PAT_26,IVY_PAT_29,IVY_PAT_31,IVY_PAT_34,IVY_PAT_36,IVY_PAT_40,IVY_PAT_61,IVY_PAT_39,IVY_PAT_44,IVY_PAT_45,IVY_PAT_47,IVY_PAT_49 - Verify that a user can create a patient and validate details  ", async ({ page }) => {
        const patientsPage = new PatientsPage(page);
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
            await expect(patientsPage.patientConsentCheckbox, "Expected the patient consent checkbox to remain unchecked before the user confirms consent.").not.toBeChecked();
            await patientsPage.clickpatientConsentCheckbox()
            await patientsPage.clickSavePatientButton()
            await patientsPage.expectToBeVisible(await patientsPage.getPatientName(patientName))
            await patientsPage.expectToBeVisible(await patientsPage.getphoneFieldLabel(phoneNumber))
            await expect.soft(patientsPage.emailFieldLabel, "Expected the saved patient email to match the entered registration email.").toHaveText(testData.newPatientForm.email);
            await expect(patientsPage.bloodGroupFieldLabel, "Expected the saved blood group to match the selected registration value.").toHaveText(testData.newPatientForm.bloodGroup)
            await expect(patientsPage.allergiesFieldLabel, "Expected the saved allergies field to match the entered known allergies value.").toHaveText(testData.newPatientForm.knownAllergies)
        })
    }) 
    // Negative test case
    test("@doctor, Verify DOB does not accept future date  ", async ({ page }) => {
        const patientsPage = new PatientsPage(page);
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
            await patientsPage.enterDatefield(testData.newPatientForm.date2)
            const phoneNumber = utils.generateRandomPhoneNumber();
            await patientsPage.enterPhoneNumberField(phoneNumber)
            await patientsPage.selectGenderField(testData.newPatientForm.gender)
            await patientsPage.selecthowDidYouHearAboutUsDropdown(testData.newPatientForm.howDidYouHearAboutUs)
            await patientsPage.clickSavePatientButton()
            await patientsPage.expectToBeVisible(await patientsPage.getPatientName(patientName), "Expected the saved patient name to match the entered first name after completing the registration form");
        })
    })
    //positive test cases
    test("@doctor, IVY_PAT_37,IVY_PAT_38,IVY_PAT_42,IVY_PAT_43,IVY_PAT_48,IVY_PAT_50,IVY_PAT_57,IVY_PAT_59,IVY_PAT_14-Verify that additional fields are unlocked and appeared on the 'Registration' form, when the user selects the howYouKnowUs field and Phone belongs to and checkbox can be deselect", async ({ page }) => {
        const patientsPage = new PatientsPage(page);
        await test.step("Navigate to the Patient Registration page", async () => {
            await patientsPage.clickPatientsTab();
            await patientsPage.clickNewPatientButton();
            await patientsPage.clickFormCancelButton();
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
            await patientsPage.selecthowDidYouHearAboutUsDropdown(testData.newPatientForm.howDidYouHearAboutUs2)
            await patientsPage.enterPleaseSpecifyFieldText(testData.newPatientForm.pleaseSpecify)
            await patientsPage.enterCompanyNameField(testData.newPatientForm.companyName)
            await patientsPage.enterEmployeeIDField(testData.newPatientForm.employeeID)
            await patientsPage.selectpriceGroupDropdownField(testData.newPatientForm.priceGroup)
            await patientsPage.selectbloodgroupDropdownField(testData.newPatientForm.bloodGroup)
            await patientsPage.enterknownAllergiesField(testData.newPatientForm.knownAllergies)
            await patientsPage.entercontactNameField(testData.newPatientForm.contactName)
            await patientsPage.entercontactPhoneField(utils.generateRandomPhoneNumber())
            await patientsPage.selectRelationshipDropdownField(testData.newPatientForm.relationship)
            await patientsPage.enterPhoneBelongsField(testData.newPatientForm.phoneBleongsto2)
            await patientsPage.enterPhoneHolderName(testData.newPatientForm.phoneHolderName)
            await expect(patientsPage.patientConsentCheckbox, "Expected the consent checkbox to start unchecked before the user toggles it during additional field validation.").not.toBeChecked();
            await patientsPage.clickpatientConsentCheckbox()
            await patientsPage.clickpatientConsentCheckbox()
            await patientsPage.clickSavePatientButton()
            await patientsPage.expectToBeVisible(await patientsPage.getPatientName(patientName), "Expected the saved patient name to match the entered first name after completing the registration form with additional fields.");
        })
    })
    //positive test cases
    test("@doctor,IVY_PAT_2,IVY_PAT_5,IVY_PAT_62,IVY_PAT_9,search saved patient and verify view,book appointment button redirected to corresponding page.", async ({ page, createpatient }) => {
        const patientsPage = new PatientsPage(page);
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
    //positive test cases
    test("@doctor, IVY_PAT_63,Verify user can edit and update form details successfully.", async ({ page, createpatient }) => {
        const patientsPage = new PatientsPage(page);
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
            await expect(patientsPage.fullName, "Expected the patient name to update to the edited first name after saving the profile changes.").toContainText(testData.patientprofile.patientDetails.firstNameTest3);
            await expect(patientsPage.emailFieldLabel, "Expected the email field on the profile to match the updated address after saving the changes.").toContainText(testData.newPatientForm.email2);
        })
    })
    //Negative test cases
    test("@doctor,IVY_PAT_13,IVY_PAT_16,IVY_PAT_17, IVY_PAT_23,IVY_PAT_46 Verify validation message is displayed on registration form and Verify Book appointment page Appears ", async ({ page }) => {
        const patientsPage = new PatientsPage(page);
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
            await expect(patientsPage.firstNameValidationMessage, "Expected the first name validation error to appear when the value contains unsupported characters.").toContainText("First name can only contain letters, spaces, hyphens, apostrophes, and periods")
            await expect(patientsPage.phoneNumberValidationMessage, "Expected a valid mobile number message to appear when the entered phone number is invalid.").toContainText("Enter a valid 10-digit mobile number (e.g. 9876543210, 09876543210, or +91 98765 43210).");
            await patientsPage.entercontactPhoneField(testData.newPatientForm.contactPhoneTest)
        })
        await test.step("Verify the Indian mobile number and first name character validation message after filling all required fields", async () => {
            await patientsPage.firstNameField.clear();
            await patientsPage.phoneNumberField.clear();
            await patientsPage.enterFirstNameField(testData.newPatientForm.firstNameTest2)
            await patientsPage.enterPhoneNumberField(testData.newPatientForm.phoneNumbertest2)
            await patientsPage.clickSavePatientButton();
            await expect(patientsPage.chracterValidation, "Expected the name length validation to appear when the first name exceeds the allowed character limit.").toContainText("First name must not exceed 100 characters")
            await expect(patientsPage.phoneNumberValidationMessage, "Expected the Indian mobile number format validation to appear when the number starts with an unsupported prefix.").toContainText("Indian mobile numbers must start with 6, 7, 8 or 9")
            await expect(patientsPage.contactPhoneError, "Expected the contact phone validation message to appear when unsupported characters are entered.").toContainText("Phone may contain only digits, spaces, +, -, ( and ). Letters and other punctuation are not allowed.");
        })
        await test.step("verify the  save and book appointment button redirect to book appointment page", async () => {
            await patientsPage.contactPhoneField.clear();
            await patientsPage.phoneNumberField.clear();
            await patientsPage.firstNameField.clear();
            const patientName = utils.generateRandomName();
            await patientsPage.enterFirstNameField(patientName);
            const phoneNumber = utils.generateRandomPhoneNumber();
            await patientsPage.enterPhoneNumberField(phoneNumber);
            await patientsPage.clicksaveBookAppointmentButton()
            await expect(patientsPage.verifyBookAppointmentHeading, "Expected the Save & Book Appointment flow to navigate to the booking page after valid patient entry.").toBeVisible();
        })
    })

    //Negative test cases
    test("@doctor,IVY_PAT_20,IVY_PAT_21,Verify the Family Sharing flow with an existing phone number and Validation message appears ", async ({ page, createpatient }) => {
        const patientsPage = new PatientsPage(page);
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
            await expect(patientsPage.belongsToValidationMessage, "Expected the 'Whose phone is this?' validation message to appear when the user submits without selecting an owner.").toContainText("Please choose whose phone this is")
            await patientsPage.selectphoneBlegongsToDropDown(testData.newPatientForm.phoneBleongsToFieldpopup)
            await patientsPage.clickSaveFamilySharingButton();
            await expect(patientsPage.sharedWithLink, "Expected the family share link to appear after successfully selecting the phone owner.").toBeVisible()
        })
    })
    //Positive test cases
    test("@doctor,IVY_PAT_20,IVY_PAT_21,IVY_PAT_22,Verify the Family Sharing flow with an existing phone number ", async ({ page, createpatient }) => {
        const patientsPage = new PatientsPage(page);
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
            await patientsPage.clickNoCancelButton();
            await patientsPage.clickSavePatientButton();
            await patientsPage.clickAddpatientButton();
            await patientsPage.selectphoneBlegongsToDropDown(testData.newPatientForm.phoneBleongsToFieldpopup)
            await patientsPage.clickSaveFamilySharingButton();
            await expect(patientsPage.sharedWithLink, "Expected the shared family record link to appear after the phone owner is selected and saved.").toBeVisible()
        })
    })
    //Positive test cases
    test("@doctor,IVY_PAT_3,IVY_PAT_4,IVY_PAT_76 Verify clicking next and previous button navigates between pages", async ({ page }) => {
        const patientsPage = new PatientsPage(page);
        await test.step("Navigate to patient profile page", async () => {
            await patientsPage.clickPatientsTab();
        });
        const currentPage = await patientsPage.getCurrentPageNumber();
        await patientsPage.clickNextButton();
        await patientsPage.clickNextButton();
        let pageText = await patientsPage.getPageNumberText();
        expect(pageText, "Expected the pagination text to move forward by two pages after clicking Next twice.").toMatch(
            new RegExp(`^Page ${currentPage + 2} of \\d+$`)
        );
        await patientsPage.clickPreviousButton();
        pageText = await patientsPage.getPageNumberText();
        expect(pageText, "Expected the pagination text to move back one page after clicking Previous once.").toMatch(
            new RegExp(`^Page ${currentPage + 1} of \\d+$`)
        );
        await patientsPage.clickPreviousButton();
        pageText = await patientsPage.getPageNumberText();
        expect(pageText, "Expected the pagination text to return to the original page after clicking Previous twice.").toMatch(
            new RegExp(`^Page ${currentPage} of \\d+$`)
        );
    });
    //Positive test cases
    test("@doctor,IVY_PAT_81,IVY_PAT_82,IVY_PAT_83,IVY_PAT_84,IVY_PAT_88-Verify medical history got saved and recommended treatment get saved", async ({ page, createpatient }) => {
        const patientsPage = new PatientsPage(page);
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
            await expect(patientsPage.diabetesCheckBox, "Expected the diabetes checkbox to be selected after the user chooses that condition.").toBeChecked();
            await patientsPage.clickusesTabaccoCheckBox();
            await expect(patientsPage.usesTabaccoCheckBox, "Expected the tobacco checkbox to be selected after the user chooses that condition.").toBeChecked();
            await patientsPage.clickusesAlcoholCheckBox();
            await expect(patientsPage.usesAlcoholCheckBox, "Expected the alcohol checkbox to be selected after the user chooses that condition.").toBeChecked();
            await patientsPage.clickPregnantCheckbox();
            await expect(patientsPage.pregnantCheckbox, "Expected the pregnancy checkbox to be selected after the user chooses that condition.").toBeChecked();
            await patientsPage.clickRadioRTherapyHistory();
            await expect(patientsPage.radioTherapyHistory, "Expected the radiation therapy checkbox to be selected after the user chooses that history.").toBeChecked();
            await patientsPage.clickCurrentlyMedicationCheckBox();
            await expect(patientsPage.currentlyMedicationCheckBox, "Expected the currently taking medication checkbox to be selected after the user chooses that condition.").toBeChecked();
            await patientsPage.enterMedicationDetails(testData.patientprofile.medicalHistory.medication)
            await patientsPage.clickSaveMedicalHistoryButton();
            await expect(patientsPage.successMedicalHistoryMessage, "Expected the medical history success message to appear after saving the patient history.").toBeVisible()
        })
        await test.step("Verify recommended treatment got selected and deleted ", async ({ }) => {
            await patientsPage.clickReccommendedTreatment()
            await patientsPage.enterFirstRecommededTreatment(testData.patientprofile.recommendedTreatment.treatment)
            await patientsPage.clickSaveReccommendedTreatmentButton();
            await expect(patientsPage.successMessageTreatmentUpdate, "Expected the recommended treatments update success message to appear after saving the treatment selection.").toContainText("Recommended treatments updated.");
        })
    })
    //negative test cases
    test("@doctor,IVY_PAT_85,IVY_PAT_86,IVY_PAT_87,verify save button is disable when  Recommended treatment is empty and verify user can add 2 treatment and delete also   ", async ({ page, createpatient }) => {
        const patientsPage = new PatientsPage(page);
        await test.step("add new patient and navigate to medical history tab", async () => {
            await patientsPage.clickPatientsTab();
            await patientsPage.enterSearchField(createpatient.Mrn);
            await patientsPage.clickViewButton(createpatient.Mrn);

            await test.step("Verify recommended treatment got selected and deleted ", async ({ }) => {
                await patientsPage.clickReccommendedTreatment();
                await expect(patientsPage.saveReccommendedTreatmentButton, "Expected the Save Recommended Treatment button to remain disabled until treatment details are entered.").toBeDisabled();
                await patientsPage.enterFirstRecommededTreatment(testData.patientprofile.recommendedTreatment.treatment)
                await patientsPage.clickSaveReccommendedTreatmentButton();
                await expect(patientsPage.successMessageTreatmentUpdate, "Expected the recommended treatments success message to appear after saving the first treatment.").toContainText("Recommended treatments updated.");
                await patientsPage.enterSecondRecommededTreatment(testData.patientprofile.recommendedTreatment.treatment)
                await patientsPage.clickRemoveTreatment();
                await patientsPage.clickSaveReccommendedTreatmentButton();
                await expect(patientsPage.successMessageTreatmentUpdate, "Expected the recommended treatments success message to appear after saving the updated treatment list.").toContainText("Recommended treatments updated.");
            })
        })
    })
    //positive test cases
    test("@doctor,IVY_PAT_79,IVY_PAT_78,IVY_PAT_80-Verify that users can upload investigation files, sort the files correctly, and delete the uploaded files successfully.", async ({ page, createpatient }) => {
        const patientsPage = new PatientsPage(page);
        await test.step("Navigate to the patient profile and open the Investigations tab", async () => {
            await patientsPage.clickPatientsTab();
            await patientsPage.enterSearchField(createpatient.Mrn);
            await patientsPage.clickViewButton(createpatient.Mrn);
            await patientsPage.clickInvestigationsTab();
        });
        await test.step("Select the investigation type and upload the file", async () => {
            await patientsPage.selectInvestigationTypeDropdown(testData.patientprofile.investigations.investigationType);
            await patientsPage.uploadFile(testData.patientprofile.investigations.file);
            await expect(patientsPage.uploadSuccessMessage, "Expected the uploaded investigation file success message to appear after the document is uploaded.").toBeVisible();
        });
        await test.step("Download the uploaded investigation file and verify the filename", async () => {
            await patientsPage.clickLipidProfileButton();
            const download = await patientsPage.clickDownloadInlineButton();
            expect(download.suggestedFilename(), "Expected the downloaded investigation file to keep the expected PDF filename after upload.").toBe("TestFileTS.pdf");
        });
        await test.step("Delete the uploaded investigation file and verify deletion", async () => {
            await patientsPage.clickDeleteInlineButton();
            await patientsPage.clickDeletePopupButton();
            await expect(patientsPage.deleteSuccessMessage, "Expected the file deletion success message to appear after removing the uploaded investigation.").toBeVisible();
        });
    });
    //Positive test cases
    test("@doctor,IVY_PAT_89,Verify that user can create plan and validate active status", async ({ page, createpatient }) => {
        const patientsPage = new PatientsPage(page);
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
            await expect(patientsPage.planStatus(planName), "Expected the newly created treatment plan status to be Active immediately after creation.").toHaveText("Active");
        });

    })
    //Negative test cases
    test("@doctor,IVY_PAT_90,Verify validation in form on create treatment plan,", async ({ page, createpatient }) => {
        const patientsPage = new PatientsPage(page);
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
            await expect(patientsPage.searchValidationMessage, "Expected the validation message to prompt the user to select a treatment before creating the plan.").toHaveText("Select a treatment");
        });
    })
    //Positive test cases
    test("@doctor,IVY_PAT_91,IVY_PAT_92,create treatment plan,cancel it and complete it and validate status completed and cancelled", async ({ page, createpatient }) => {
        const patientsPage = new PatientsPage(page);
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
            await expect(patientsPage.planStatus(planName), "Expected the treatment plan status to show Active right after the plan is created.").toHaveText("Active");
        });
        await test.step("Verify the treatments are added to treatment plan and status change accordingly", async () => {
            const planName = testData.patientprofile.treatmentPlan.firstName;
            const firstTreatment = testData.patientprofile.treatmentPlan.firstTreatment;
            const secondTreatment = testData.patientprofile.treatmentPlan.secondTreatment;
            await patientsPage.clickPlanCard(planName);
            await expect(patientsPage.firstTreatmentDetail(firstTreatment), "Expected the first treatment detail to appear on the plan card after adding it.").toContainText(firstTreatment);
            await expect(patientsPage.secondTreatmentDetail(secondTreatment), "Expected the second treatment detail to appear on the plan card after adding it.").toContainText(secondTreatment);
            await patientsPage.clickMarkCompletedButton();
            await patientsPage.clickYesComplete();
            await patientsPage.clickpopupCloseButton();
            await expect(patientsPage.planStatus(planName), "Expected the treatment plan status to update to Completed after marking the plan as complete.").toHaveText("Completed");
            await patientsPage.clickPlanCard(planName);
            await patientsPage.clickCancelPlanButton();
            await patientsPage.clickyesCancelPlan();
            await patientsPage.clickpopupCloseButton();
            await expect(patientsPage.planStatus(planName), "Expected the treatment plan status to update to Cancelled after canceling the plan.").toHaveText("Cancelled");
        });
    })
})