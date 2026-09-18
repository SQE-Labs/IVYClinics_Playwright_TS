import { test, expect } from "../fixtures/testfixtures";
import { BenefitLotsPage } from "../pages/BenefitLotsPage";
import testData from "../test-data/test-data.json"

test.describe("Benefit Lots Page", () => {

    test.beforeEach(async ({ page }) => {
        await page.goto("/benefit-lots");
    });
//Positive test case
    test("Verify that user is able to create a Benefit Lot", async ({ page }) => {
        const benefitLotsPage = new BenefitLotsPage(page);
          await test.step("Navigate to the Appointment Registration Page", async () => {
            await benefitLotsPage.clickbenifitLotTab();
            await benefitLotsPage.clicknewLotButton();
        })
        await benefitLotsPage.selectProgram(testData.benefitLot.program);
       // await benefitLotsPage.selectProgram(testData.benefitLot.program);
        await benefitLotsPage.enterLotCode(testData.benefitLot.lotCode);
        await benefitLotsPage.enterLotName(testData.benefitLot.lotName);
        await benefitLotsPage.enterWalletValue(testData.benefitLot.walletValue);
        await benefitLotsPage.enterExpiryDate(testData.benefitLot.expiryDate);
        await benefitLotsPage.selectDiscountTaxMode(testData.benefitLot.discountTaxMode);
        await benefitLotsPage.selectCodeGenerationMode(testData.benefitLot.codeGenerationMode);
        await benefitLotsPage.enterNotes(testData.benefitLot.notes);
        await benefitLotsPage.clickCreateButton();
        await expect( benefitLotsPage.createdMessage,"Expected benefit lot created message to be visible.").toBeVisible();
    });
});