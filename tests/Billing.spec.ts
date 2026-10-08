import { test, expect } from "../fixtures/testfixtures";
import { BillingPage } from "../pages/Billingpage";
import testData from "../test-data/test-data.json";

test.describe("Appointments Page", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("/billing");
    });
    // Positive test
    test("Verify billing, payment, received amount and amount due", async ({ page, createpatient }) => {
        const billingPage = new BillingPage(page);
        await test.step("Navigate to patient profile and create bill", async () => {
            await billingPage.clickPatientsTab();
            await billingPage.enterSearchField(createpatient.Mrn);
            await billingPage.clickViewButton(createpatient.Mrn);
            await billingPage.clickbillingTab();
            await billingPage.clickcreateBillButton();
            await expect(
                billingPage.createBillHeading,
                "Expected Create Bill Page should be visible."
            ).toBeVisible();
        });
        await test.step("Add treatment and verify treatment total", async () => {
            await billingPage.enterFirstTreatmentPlan(
                testData.createBill.firstTreatment
            );
            await billingPage.clickAddButton();
            const treatmentTotal = await billingPage.getTreatmentTotal();
            const amountPayable = await billingPage.getAmountPayable();
            expect(
                treatmentTotal,
                "Sum of all treatment totals should match Amount Payable."
            ).toBe(amountPayable);
        });
        await test.step("Apply rate card and bill discount", async () => {
            await billingPage.selectRateCard(
                testData.Appointments["createbill(pricing)"].RateCard
            );
            await billingPage.selectBillDiscount(
                testData.Appointments["createbill(pricing)"].BillDiscount
            );
            await billingPage.selectDiscountReason(
                testData.Appointments["createbill(pricing)"].DiscountReason
            );
            await billingPage.enterBusinessName(
                testData.Appointments["createbill(pricing)"]["Employeename/ID"]
            );
            await billingPage.clickApplyButton();
            const additionalBillDiscount =
                await billingPage.getAdditionalBillDiscount();
            const amountPayable =
                await billingPage.getAmountPayable();
            const netAmountPayable =
                await billingPage.getNetAmountPayable();
            expect(
                netAmountPayable,
                "Net Amount Payable should equal Amount Payable minus Additional Bill Discount."
            ).toBe(amountPayable - additionalBillDiscount);
        });
        await test.step("Finalize the bill", async () => {
            await billingPage.clickfinalizeButton();
            await billingPage.clickfinalizePopUpButton();
            await expect(
                billingPage.billFinalizeSection,
                "Expected Bill finalized section to be visible."
            ).toBeVisible();
            await expect(
                billingPage.receivePaymentHeading,
                "Expected Receive Payment section to be visible."
            ).toBeVisible();
        });
        await test.step("Receive partial payment", async () => {
            await billingPage.selectMethodDropdown(
                testData.Appointments.ReceivePayment.Method
            );
            const Amount = testData.Appointments.ReceivePayment.Amount;
            await billingPage.fillAmountField(Amount);
            await billingPage.fillReferenceInputField(
                testData.Appointments.ReceivePayment.Reference
            );
            await billingPage.clickReceiveButton();
            await billingPage.clickReceivePopupButton();
            await page.waitForTimeout(2000);
        });
        await test.step("Verify received amount and amount due", async () => {
            const receivedAmount = await billingPage.getReceivedAmount();
            const amountDue = await billingPage.getAmountDue();
            const netAmount = await billingPage.getNetAmountPayable();
            expect(
                receivedAmount,
                "Received Amount should match the payment amount entered."
            ).toBe(Number(testData.Appointments.ReceivePayment.Amount));
            expect(
                amountDue,
                "Amount Due should equal Net Amount Payable minus Received Amount."
            ).toBe(netAmount - receivedAmount);
        });
    });
    // Negative test
    test("Verify validation message when bill discount is applied without discount reason", async ({ page, createpatient }) => {
        const billingPage = new BillingPage(page);
        await test.step("Navigate to patient profile and create bill", async () => {
            await billingPage.clickPatientsTab();
            await billingPage.enterSearchField(createpatient.Mrn);
            await billingPage.clickViewButton(createpatient.Mrn);
            await billingPage.clickbillingTab();
            await billingPage.clickcreateBillButton();
            await expect(
                billingPage.createBillHeading,
                "Expected Create Bill Page should be visible."
            ).toBeVisible();
        });
        await test.step("Select rate card and bill discount", async () => {
            await billingPage.selectRateCard(
                testData.Appointments["createbill(pricing)"].RateCard
            );

            await billingPage.selectBillDiscount(
                testData.Appointments["createbill(pricing)"].BillDiscount
            );
        });
        await test.step("Verify validation when discount reason is not selected", async () => {
            await billingPage.clickApplyButton();
            await expect(
                billingPage.discountReasonRequiredMessage.first(),
                "Expected validation message when discount reason is not selected."
            ).toHaveText(
                "Please select a discount reason and enter the required detail before applying the bill discount."
            );
        });
        await test.step("Verify validation when required discount detail is not entered", async () => {
            await billingPage.selectDiscountReason(
                testData.Appointments["createbill(pricing)"].DiscountReason
            );
            await billingPage.clickApplyButton();
            await expect(
                billingPage.discountReasonRequiredMessage.last(),
                "Expected validation message when required discount detail is not entered."
            ).toHaveText(
                "Please select a discount reason and enter the required detail before applying the bill discount."
            );
        });
    });
    // positive test case
    test("Verify full payment and validate Amount Due as zero", async ({ page, createpatient }) => {
        const billingPage = new BillingPage(page);
        await test.step("Navigate to patient profile and create bill", async () => {
            await billingPage.clickPatientsTab();
            await billingPage.enterSearchField(createpatient.Mrn);
            await billingPage.clickViewButton(createpatient.Mrn);
            await billingPage.clickbillingTab();
            await billingPage.clickcreateBillButton();
            await expect(
                billingPage.createBillHeading,
                "Expected Create Bill Page should be visible."
            ).toBeVisible();
        });
        await test.step("Add treatment and verify treatment total", async () => {
            await billingPage.enterFirstTreatmentPlan(
                testData.createBill.firstTreatment
            );
            await billingPage.clickAddButton();
            const treatmentTotal = await billingPage.getTreatmentTotal();
            const amountPayable = await billingPage.getAmountPayable();
            expect(
                treatmentTotal,
                "Sum of all treatment totals should match Amount Payable."
            ).toBe(amountPayable);
        });
        await test.step("Apply rate card and bill discount", async () => {
            await billingPage.selectRateCard(
                testData.Appointments["createbill(pricing)"].RateCard
            );
            await billingPage.selectBillDiscount(
                testData.Appointments["createbill(pricing)"].BillDiscount
            );
            await billingPage.selectDiscountReason(
                testData.Appointments["createbill(pricing)"].DiscountReason
            );
            await billingPage.enterBusinessName(
                testData.Appointments["createbill(pricing)"]["Employeename/ID"]
            );
            await billingPage.clickApplyButton();
            const additionalBillDiscount =
                await billingPage.getAdditionalBillDiscount();
            const netAmountPayable =
                await billingPage.getNetAmountPayable();
            const amountPayable =
                await billingPage.getAmountPayable();
            expect(
                netAmountPayable,
                "Net Amount Payable should equal Amount Payable minus Additional Bill Discount."
            ).toBe(amountPayable - additionalBillDiscount);
        });
        await test.step("Finalize the bill", async () => {
            await billingPage.clickfinalizeButton();
            await billingPage.clickfinalizePopUpButton();
            await expect(
                billingPage.billFinalizeSection,
                "Expected Bill finalized section to be visible."
            ).toBeVisible();
            await expect(
                billingPage.receivePaymentHeading,
                "Expected Receive Payment section to be visible."
            ).toBeVisible();
        });
        await test.step("Receive full payment", async () => {
            await billingPage.selectMethodDropdown(
                testData.Appointments.ReceivePayment.Method
            );
            const netAmountPayable =
                await billingPage.getNetAmountPayable();
            const fullPaymentAmount = String(netAmountPayable);
            await billingPage.fillAmountField(fullPaymentAmount);
            await billingPage.fillReferenceInputField(
                testData.Appointments.ReceivePayment.Reference
            );
            await billingPage.clickReceiveButton();
            await billingPage.clickReceivePopupButton();
            await page.waitForTimeout(2000);
        });
        await test.step("Verify fully paid status and Amount Due", async () => {
            await expect(
                billingPage.fullyPaid,
                "Expected Fully Paid section to be visible."
            ).toBeVisible();
            const receivedAmount =
                await billingPage.getReceivedAmount();
            const amountDue =
                await billingPage.getAmountDue();
            const netAmountPayable =
                await billingPage.getNetAmountPayable();
            expect(
                receivedAmount,
                "Received Amount should equal Net Amount Payable for full payment."
            ).toBe(netAmountPayable);
            expect(
                amountDue,
                "Amount Due should be 0 after full payment."
            ).toBe(0);
            await billingPage.clickBackButton();
            await billingPage.clickSaveDraft();
            await billingPage.clickbillingTab();
            await expect(billingPage.paidstatus).toBeVisible();
        });
    });
    //positive test case
    test("Verify when no payment is done pending status is shown", async ({ page, createpatient }) => {
        const billingPage = new BillingPage(page);
        await test.step("Navigate to patient profile and create bill", async () => {
            await billingPage.clickPatientsTab();
            await billingPage.enterSearchField(createpatient.Mrn);
            await billingPage.clickViewButton(createpatient.Mrn);
            await billingPage.clickbillingTab();
            await billingPage.clickcreateBillButton();
            await expect(
                billingPage.createBillHeading,
                "Expected Create Bill Page should be visible."
            ).toBeVisible();
        });
        await test.step("Add treatment and verify treatment total", async () => {
            await billingPage.enterFirstTreatmentPlan(
                testData.createBill.firstTreatment
            );
            await billingPage.clickfinalizeButton();
            await billingPage.clickfinalizePopUpButton();
            await
                await billingPage.clickSaveDraft();
            await billingPage.clickSaveDraft();
            await billingPage.clickBackButton();
            await billingPage.clickbillingTab();
            await expect(billingPage.pendingStatus).toBeVisible();
        });
    });
    //inprogess test case
    test("Verify that Outstanding due is visible on billing page when bill is due and user should able to recieve bill", async ({ page, createpatient }) => {
        const billingPage = new BillingPage(page);
        await test.step("Navigate to patient profile and create bill", async () => {
            await billingPage.clickPatientsTab();
            await billingPage.enterSearchField(createpatient.Mrn);
            await billingPage.clickViewButton(createpatient.Mrn);
            await billingPage.clickbillingTab();
            await billingPage.clickcreateBillButton();
            await expect(
                billingPage.createBillHeading,
                "Expected Create Bill Page should be visible."
            ).toBeVisible();
        });
        await test.step("Add treatment and verify treatment total", async () => {
            await billingPage.enterFirstTreatmentPlan(
                testData.createBill.firstTreatment
            );
            await billingPage.clickfinalizeButton();
            await billingPage.clickfinalizePopUpButton();
            await billingPage.clickSaveDraft();
            await billingPage.clickSaveDraft();
            await billingPage.clickBackButton();
            await billingPage.clickbillingTab();
            await billingPage.clickcreateBillButton();
            await expect(
                billingPage.outstandDue,
                "Expected Outstanding due is showing when payment is due"
            ).toBeVisible();
            billingPage.clickRecievePaymentButton();
            await billingPage.enterReceiveAmount(testData.createBill["ReceivePayment(outstandingdue)"].ReceiveAmount);
            await billingPage.selectPaymentMethod(testData.createBill["ReceivePayment(outstandingdue)"].Method);
            await billingPage.clickReciveButton()
            const initialAmounts = await billingPage.getBillAmounts();
            
            expect(
                initialAmounts.total,
                "Expected Total to equal Paid + Due."
            ).toBe(initialAmounts.paid + initialAmounts.due);
        });
    });
    //Negative Test case
    test("Verify that an amount greater than the treatment amount cannot be received", async ({ page, createpatient }) => {
        const billingPage = new BillingPage(page);
        await test.step("Navigate to patient profile and create bill", async () => {
            await billingPage.clickPatientsTab();
            await billingPage.enterSearchField(createpatient.Mrn);
            await billingPage.clickViewButton(createpatient.Mrn);
            await billingPage.clickbillingTab();
            await billingPage.clickcreateBillButton();
            await expect(
                billingPage.createBillHeading,
                "Expected Create Bill Page should be visible."
            ).toBeVisible();
        });
        await test.step("Add treatment and verify treatment total", async () => {
            await billingPage.enterFirstTreatmentPlan(
                testData.createBill.firstTreatment
            );
            await billingPage.clickAddButton();
            const treatmentTotal = await billingPage.getTreatmentTotal();
            const amountPayable = await billingPage.getAmountPayable();
            expect(
                treatmentTotal,
                "Sum of all treatment totals should match Amount Payable."
            ).toBe(amountPayable);
        });
        await test.step("Finalize the bill", async () => {
            await billingPage.clickfinalizeButton();
            await billingPage.clickfinalizePopUpButton();
            await expect(
                billingPage.billFinalizeSection,
                "Expected Bill finalized section to be visible."
            ).toBeVisible();
            await expect(
                billingPage.receivePaymentHeading,
                "Expected Receive Payment section to be visible."
            ).toBeVisible();
        });
        await test.step("Receive full payment", async () => {
            await billingPage.selectMethodDropdown(
                testData.Appointments.ReceivePayment.Method
            );
            await billingPage.fillAmountField(testData.Appointments.ReceivePayment.Amount2);
            await billingPage.fillReferenceInputField(
                testData.Appointments.ReceivePayment.Reference
            );
            await billingPage.clickReceiveButton();
            await billingPage.clickReceivePopupButton();
            await expect(billingPage.invalidPaymentAmountToast).toBeVisible()
        });
    });
});