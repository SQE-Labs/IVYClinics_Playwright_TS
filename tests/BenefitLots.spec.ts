import { test, expect } from "../fixtures/testfixtures";
import { BenefitLotsPage } from "../pages/BenefitLotsPage";
import testData from "../test-data/test-data.json"
import { utils } from "../utils/Utility";

test.describe("Benefit Lots Page", () => {

    test.beforeEach(async ({ page }) => {
        await page.goto("/benefit-lots");
    });
    //Positive test case
    test("@receptionist,Verify that user is able to create a Benefit Lot", async ({ page }) => {
        const benefitLotsPage = new BenefitLotsPage(page);
        await test.step("Navigate to the Appointment Registration Page", async () => {
            await benefitLotsPage.clickbenifitLotTab();
            await benefitLotsPage.clicknewLotButton();
        })
        await benefitLotsPage.selectProgram(testData.benefitLot.program);
        // await benefitLotsPage.selectProgram(testData.benefitLot.program);
        const lotCode = utils.generateProgramCode()
        await benefitLotsPage.enterLotCode(lotCode);
        await benefitLotsPage.enterLotName(testData.benefitLot.lotName);
        await benefitLotsPage.enterWalletValue(testData.benefitLot.walletValue);
        await benefitLotsPage.enterExpiryDate(testData.benefitLot.expiryDate);
        await benefitLotsPage.selectDiscountTaxMode(testData.benefitLot.discountTaxMode);
        await benefitLotsPage.selectCodeGenerationMode(testData.benefitLot.codeGenerationMode);
        await benefitLotsPage.enterNotes(testData.benefitLot.notes);
        await benefitLotsPage.clickCreateButton();
        await expect(benefitLotsPage.createdMessage, "Expected benefit lot created message to be visible.").toBeVisible();
    });
    //Negative
     test("@receptionist,Verify validation Message appears when user try to enter privious date in expiry date", async ({ page }) => {
        const benefitLotsPage = new BenefitLotsPage(page);
        await test.step("Navigate to the Appointment Registration Page", async () => {
            await benefitLotsPage.clickbenifitLotTab();
            await benefitLotsPage.clicknewLotButton();
        })
        await benefitLotsPage.selectProgram(testData.benefitLot.program);
        const lotCode = utils.generateProgramCode()
        await benefitLotsPage.enterLotCode(lotCode);
        await benefitLotsPage.enterLotName(testData.benefitLot.lotName);
        await benefitLotsPage.enterWalletValue(testData.benefitLot.walletValue);
        await await benefitLotsPage.enterExpiryDate(testData.benefitLot.expiryDate);
        await benefitLotsPage.selectDiscountTaxMode(testData.benefitLot.discountTaxMode);
        await benefitLotsPage.selectCodeGenerationMode(testData.benefitLot.codeGenerationMode);
        await benefitLotsPage.enterNotes(testData.benefitLot.notes);
        await benefitLotsPage.clickCreateButton();
        await benefitLotsPage.clickbackToLotsButton()
        await benefitLotsPage.clicknewLotButton();
        // await benefitLotsPage.clickbenifitLotList()
        await benefitLotsPage.selectProgram(testData.benefitLot.program);
        await benefitLotsPage.enterLotCode(lotCode);
        await benefitLotsPage.enterLotName(testData.benefitLot.lotName);
        await benefitLotsPage.enterWalletValue(testData.benefitLot.walletValue);
        await benefitLotsPage.selectDiscountTaxMode(testData.benefitLot.discountTaxMode);
        await benefitLotsPage.selectCodeGenerationMode(testData.benefitLot.codeGenerationMode);
        await benefitLotsPage.enterNotes(testData.benefitLot.notes);
        await benefitLotsPage.enterExpiryDate(testData.benefitLot.expiryDate2);
        await benefitLotsPage.clickCreateButton();
        await expect(benefitLotsPage.expiryDateErrorMessage, "Expected validation message should appear.").toHaveText("Expiry date must be in the future")
       
    });
    
});