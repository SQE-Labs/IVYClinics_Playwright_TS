import { expect, test } from "../fixtures/testfixtures";
import { BenefitProgramsPage } from "../pages/BenefitProgramsPage";
import { utils } from "../utils/Utility";
import testData from "../test-data/test-data.json";

test.describe("Benefit Programs Page", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("/benefit-programs");
    })
    test("IVY_BP_01, IVY_BP_02, IVY_BP_03, IVY_BP_04, IVY_BP_05, IVY_BP_06, IVY_BP_07, IVY_BP_08, IVY_BP_09, IVY_BP_10, IVY_BP_11, IVY_BP_12, IVY_BP_15 Verify that a user can create and update a benefit program and validate details", async ({ page }) => {
        const benefitProgramPage = new BenefitProgramsPage(page);
        const programCode = utils.generateProgramCode();
        const programName = utils.generateProgramName();
        const updatedProgramName = utils.generateProgramName();
        await test.step("Navigate to Benefit Programs and verify the page", async () => {
            await benefitProgramPage.clickBenefitProgramsTab();
            await benefitProgramPage.expectToBeVisible(benefitProgramPage.benefitProgramsHeading);
        });
        await test.step("Create a benefit program and validate the program details", async () => {
            await benefitProgramPage.clickAddProgramButton();
            await benefitProgramPage.expectToBeVisible(benefitProgramPage.addProgramHeading);
            await benefitProgramPage.clickCancelButton();
            await expect(benefitProgramPage.addProgramHeading, "Expected the Add Program modal to close after canceling the form.").not.toBeVisible();
            await benefitProgramPage.clickAddProgramButton();
            await benefitProgramPage.expectToBeVisible(benefitProgramPage.addProgramHeading);
            await benefitProgramPage.fillProgramCode(programCode);
            await benefitProgramPage.fillProgramName(programName);
            await benefitProgramPage.selectInstrumentType(testData.benefitProgram.instrumentType);
            await benefitProgramPage.selectStatus(testData.benefitProgram.status);
            await benefitProgramPage.fillDescription(testData.benefitProgram.description);
            await benefitProgramPage.clickCreateProgramButton();
            await benefitProgramPage.expectToBeVisible(benefitProgramPage.successMessage);
            const programRow = await benefitProgramPage.getProgramRow(programCode);
            await expect(programRow, "Expected the created benefit program row to include the generated program code.").toContainText(programCode);
            await expect(programRow, "Expected the created benefit program row to include the generated program name.").toContainText(programName);
        });
        await test.step("Update the benefit program and validate the updated details", async () => {
            await benefitProgramPage.clickEditForProgram(programCode);
            await benefitProgramPage.expectToBeVisible(benefitProgramPage.editProgramHeading);
            await benefitProgramPage.clickCancelButton();
            await expect(benefitProgramPage.editProgramHeading, "Expected the Edit Program modal to close after canceling the form.").not.toBeVisible();
            await benefitProgramPage.clickEditForProgram(programCode);
            await benefitProgramPage.expectToBeVisible(benefitProgramPage.editProgramHeading);
            await benefitProgramPage.fillProgramName(updatedProgramName);
            await benefitProgramPage.fillDescription(testData.benefitProgram.updatedDescription);
            await benefitProgramPage.clickUpdateProgramButton();
            await benefitProgramPage.expectToBeVisible(benefitProgramPage.updateSuccessMessage);
            await page.reload();
            const updatedProgramRow = await benefitProgramPage.getProgramRow(programCode);
            await expect(updatedProgramRow, "Expected the updated benefit program row to retain the program code after the save.").toContainText(programCode);
            await expect(updatedProgramRow, "Expected the updated benefit program row to show the edited program name after the save.").toContainText(updatedProgramName);
            await expect(updatedProgramRow, "Expected the updated benefit program row to show the new description after the save.").toContainText(testData.benefitProgram.updatedDescription);
        });
    })

    test("IVY_BP_13, IVY_BP_16 Verify that a user cannot create a benefit program with a duplicate program code", async ({ page }) => {
        const benefitProgramPage = new BenefitProgramsPage(page);
        const programCode = utils.generateProgramCode();
        const programName = utils.generateProgramName();
        const duplicateProgramName = utils.generateProgramName();
        await test.step("Create a benefit program with a unique program code", async () => {
            await benefitProgramPage.clickBenefitProgramsTab();
            await benefitProgramPage.expectToBeVisible(benefitProgramPage.benefitProgramsHeading);
            await benefitProgramPage.clickAddProgramButton();
            await benefitProgramPage.expectToBeVisible(benefitProgramPage.addProgramHeading);
            await benefitProgramPage.fillProgramCode(programCode);
            await benefitProgramPage.fillProgramName(programName);
            await benefitProgramPage.selectInstrumentType(testData.benefitProgram.instrumentType);
            await benefitProgramPage.selectStatus(testData.benefitProgram.status);
            await benefitProgramPage.fillDescription(testData.benefitProgram.description);
            await benefitProgramPage.clickCreateProgramButton();
            await benefitProgramPage.expectToBeVisible(benefitProgramPage.successMessage)
        });
        await test.step("Attempt to create a benefit program with a duplicate program code and validate the error", async () => {
            await benefitProgramPage.clickAddProgramButton();
            await benefitProgramPage.expectToBeVisible(benefitProgramPage.addProgramHeading);
            await benefitProgramPage.fillProgramCode(programCode);
            await benefitProgramPage.fillProgramName(duplicateProgramName);
            await benefitProgramPage.selectInstrumentType(testData.benefitProgram.instrumentType);
            await benefitProgramPage.selectStatus(testData.benefitProgram.status);
            await benefitProgramPage.fillDescription(testData.benefitProgram.description);
            await benefitProgramPage.clickCreateProgramButton();
            await benefitProgramPage.expectToBeVisible(benefitProgramPage.duplicateProgramCodeMessage);
            await benefitProgramPage.clickCloseModalButton();
            await expect(benefitProgramPage.addProgramHeading, "Expected the duplicate code modal to close after the user dismisses it.").not.toBeVisible();
        });
    })

    test("IVY_BP_14 Verify that a user can create benefit programs with the same program name", async ({ page }) => {
        const benefitProgramPage = new BenefitProgramsPage(page);
        const programCode = utils.generateProgramCode();
        const programName = utils.generateProgramName();
        const newProgramCode = utils.generateProgramCode();
        await test.step("Create a benefit program with a unique program name", async () => {
            await benefitProgramPage.clickBenefitProgramsTab();
            await benefitProgramPage.expectToBeVisible(benefitProgramPage.benefitProgramsHeading);
            await benefitProgramPage.clickAddProgramButton();
            await benefitProgramPage.expectToBeVisible(benefitProgramPage.addProgramHeading);
            await benefitProgramPage.fillProgramCode(programCode);
            await benefitProgramPage.fillProgramName(programName);
            await benefitProgramPage.selectInstrumentType(testData.benefitProgram.instrumentType);
            await benefitProgramPage.selectStatus(testData.benefitProgram.status);
            await benefitProgramPage.fillDescription(testData.benefitProgram.description);
            await benefitProgramPage.clickCreateProgramButton();
            await benefitProgramPage.expectToBeVisible(benefitProgramPage.successMessage);
        });
        await test.step("Create a benefit program with a duplicate program name and validate the program details", async () => {
            await benefitProgramPage.clickAddProgramButton();
            await benefitProgramPage.expectToBeVisible(benefitProgramPage.addProgramHeading);
            await benefitProgramPage.fillProgramCode(newProgramCode);
            await benefitProgramPage.fillProgramName(programName);
            await benefitProgramPage.selectInstrumentType(testData.benefitProgram.instrumentType);
            await benefitProgramPage.selectStatus(testData.benefitProgram.status);
            await benefitProgramPage.fillDescription(testData.benefitProgram.description);
            await benefitProgramPage.clickCreateProgramButton();
            await benefitProgramPage.expectToBeVisible(benefitProgramPage.successMessage);
            const newProgramRow = await benefitProgramPage.getProgramRow(newProgramCode);
            await expect(newProgramRow, "Expected the second program row to include the new program code even when the name is reused.").toContainText(newProgramCode);
            await expect(newProgramRow, "Expected the second program row to include the original program name even when the code is different.").toContainText(programName);
        });
    })
});