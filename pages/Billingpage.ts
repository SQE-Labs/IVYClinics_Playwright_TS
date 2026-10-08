import { Locator, Page } from "@playwright/test";
import { BasePage } from "../base/BasePage";


export class BillingPage extends BasePage {

    readonly treatmentTotals: Locator;
    readonly treatmentRows: Locator;
    readonly amountPayable: Locator;
    readonly additionalBillDiscount: Locator;
    readonly rateCard: Locator;
    readonly billDiscount: Locator;
    readonly discountReason: Locator;
    readonly businessName: Locator;
    readonly applyButton: Locator;
    readonly netAmountPayable: Locator;
    readonly addButton: Locator;
    readonly discountReasonRequiredMessage: Locator;
    readonly finalizeButton: Locator;
    readonly finalizePopUpButton: Locator;
    readonly billFinalizeSection: Locator;
    readonly receivePaymentHeading: Locator;
    readonly methodDropDownField: Locator;
    readonly amountField: Locator;
    readonly referenceInputField: Locator;
    readonly receiveButton: Locator;
    readonly receivePopupButton: Locator;
    readonly receivedAmount: Locator;
    readonly amountDue: Locator;
    readonly patientsTab: Locator;
    readonly searchBoxField: Locator;
    readonly viewButton: Function;
    readonly patientNameList: Function;
    readonly billingTab: Locator;
    readonly createBillButton: Locator;
    readonly createBillHeading: Locator;
    readonly searchTreatmentField: Locator;
    readonly firstTreatementPlan: Locator;
    readonly fullyPaid: Locator;
    readonly backButton: Locator;
    readonly paidstatus: Locator;
    readonly saveDraft: Locator;
    readonly pendingStatus: Locator;
    readonly invalidPaymentAmountToast: Locator;
    readonly outstandDue: Locator;
    readonly recievePaymentButton: Locator;
    readonly receiveAmountField: Locator;
    readonly methodField: Locator;
    readonly referenceField: Locator;
    readonly totalAmount: Locator;
    readonly paidAmount: Locator;
    readonly dueAmount: Locator;
    readonly reciveButton: Locator;
    readonly openBillButton :Locator;


    constructor(page: Page) {
        super(page);
        this.patientsTab = page.getByRole('link', { name: 'Patients', exact: true })
        this.searchBoxField = page.getByRole('textbox', { name: 'Search by name, phone, or email...' })
        this.viewButton = (Mrn: string) => this.patientNameList(Mrn).getByRole("button", { name: "View" });
        this.patientNameList = (Mrn: string) => this.page.locator("tr").filter({ hasText: Mrn });
        this.billingTab = this.page.getByRole('button', { name: 'Billing' })
        this.createBillButton = this.page.getByText('Create Bill', { exact: true })
        this.createBillHeading = this.page.getByRole('heading', { name: 'Create Bill' })
        this.searchTreatmentField = this.page.getByRole('textbox', { name: 'Search treatments / procedures to add...' })
        this.firstTreatementPlan = page.getByText('Chemical Peel – Salicylic Acid - 4 Sessions - 10% Discount')
        this.fullyPaid = this.page.getByText('Fully Paid')
        this.backButton = this.page.getByRole('button', { name: 'Back' })
        this.paidstatus = this.page.getByRole('cell', { name: 'PAID' })
        this.saveDraft = this.page.getByRole('button', { name: 'Save Draft', exact: true })
        this.pendingStatus = this.page.getByText('PENDING')
        this.invalidPaymentAmountToast = this.page.getByRole('alert').filter({
            hasText: 'Invalid Payment Amount'
        });
        this.recievePaymentButton = page.getByRole('button', { name: 'Receive Payment' })
        this.outstandDue = page.getByText('Outstanding Dues', { exact: true })
        this.receiveAmountField = page.locator("//input[@placeholder='Enter received amount']")
        this.methodField = this.page.locator('select').filter({ has: this.page.locator('option[value="CASH"]') });
        this.reciveButton = this.page.getByText('Receive', { exact: true })
        this.referenceField = this.page.getByRole('textbox', { name: 'Optional' })
        this.totalAmount = this.page.locator('span').filter({
            hasText: /^Total:/
        });
        this.paidAmount = this.page.locator('span').filter({
            hasText: /^Paid:/
        });
        this.dueAmount = this.page.locator('span').filter({
            hasText: /^Due:/
        });
        this.openBillButton = this.page.getByRole('button', { name: 'Open Bill' })
        this.treatmentTotals = this.page
            .locator("span")
            .filter({ hasText: /^₹[0-9,]+\.[0-9]{2}$/ });
        this.treatmentRows = this.page
            .locator('div[class^="_serviceNameCell_"]')
            .locator("../..");
        this.amountPayable = this.page
            .getByText("Amount Payable", { exact: true })
            .locator("..")
            .locator("span")
            .nth(1);
        this.additionalBillDiscount = this.page
            .getByText(/Additional Bill Discount/)
            .locator("..")
            .locator("span")
            .nth(1);
        this.rateCard = this.page.locator("#rate-card");
        this.billDiscount = this.page.locator("#bill-discount");
        this.discountReason = this.page.locator("#discount-reason");
        this.businessName = this.page.getByText("Employee name / ID*");
        this.applyButton = this.page.getByRole("button", {
            name: "Apply",
            exact: true
        });
        this.netAmountPayable = this.page
            .getByText("Net Amount Payable", { exact: true })
            .locator("..")
            .locator("span")
            .nth(1);
        this.addButton = this.page
            .locator("button")
            .filter({ hasText: "+" })
            .first();
        this.discountReasonRequiredMessage = this.page.getByText(
            "Please select a discount reason and enter the required detail before applying the bill discount."
        );
        this.finalizeButton = this.page.getByRole("button", {
            name: "Finalize Invoice"
        });
        this.finalizePopUpButton = this.page.getByText("Finalize", {
            exact: true
        });
        this.billFinalizeSection = this.page.getByText(
            "Bill finalized. As Owner, you can still make changes.",
            { exact: true }
        );
        this.receivePaymentHeading = this.page.getByRole("heading", {
            name: "Receive Payment"
        });
        this.methodDropDownField = this.page.getByRole("combobox", {
            name: "Method"
        });
        this.amountField = this.page.getByLabel("Amount", {
            exact: true
        });
        this.referenceInputField = this.page.getByLabel("Reference");
        this.receiveButton = this.page.getByRole("button", {
            name: "Receive",
            exact: true
        });
        this.receivePopupButton = this.page
            .locator("button")
            .filter({ hasText: "Receive" })
            .last();
        this.receivedAmount = this.page
            .getByText("Received Amount", { exact: true })
            .locator("..")
            .locator("span")
            .nth(1);
        this.amountDue = this.page
            .getByText("Amount Due", { exact: true })
            .locator("..")
            .locator("span")
            .nth(1);
    }
    async clickPatientsTab() {
        await this.click(this.patientsTab)
    }
    async enterSearchField(search: string) {
        await this.fill(this.searchBoxField, search)
    }
    async clickViewButton(Mrn: string) {
        await this.viewButton(Mrn).click();
    }
    async clickbillingTab() {
        await this.click(this.billingTab)
    }
    async clickcreateBillButton() {
        await this.click(this.createBillButton)
    }
    async enterFirstTreatmentPlan(treatment: string) {
        await this.fill(this.searchTreatmentField, treatment)
        await this.firstTreatementPlan.hover();
        await this.firstTreatementPlan.click();
    }
    async getTreatmentTotal(): Promise<number> {
        const count = await this.treatmentRows.count();
        let treatmentTotal = 0;
        for (let i = 0; i < count; i++) {
            const amounts = this.treatmentRows
                .nth(i)
                .locator('text=/₹[0-9,]+\.[0-9]{2}/');

            const value = await amounts.last().innerText();
            treatmentTotal += Number(
                value.replace(/[₹,\s]/g, "")
            );
        }
        return treatmentTotal;
    }

    async getAmountPayable(): Promise<number> {
        const amountPayableText =
            await this.amountPayable.innerText();

        return Number(
            amountPayableText.replace(/[₹,\s]/g, "")
        );
    }

    async getAdditionalBillDiscount(): Promise<number> {
        if (
            await this.page
                .getByText(/Additional Bill Discount/)
                .count() === 0
        ) {
            return 0;
        }

        const value =
            await this.additionalBillDiscount.innerText();

        return Number(
            value.replace(/[₹,\s−-]/g, "")
        );
    }

    async selectRateCard(rateCard: string) {
        await this.rateCard.selectOption({ label: rateCard });
    }

    async selectBillDiscount(billDiscount: string) {
        await this.billDiscount.selectOption({ label: billDiscount });
    }

    async selectDiscountReason(discountReason: string) {
        await this.discountReason.selectOption({ label: discountReason });
    }

    async enterBusinessName(businessName: string) {
        await this.businessName.fill(businessName);
    }

    async clickApplyButton() {
        await this.applyButton.click();
    }

    async getNetAmountPayable(): Promise<number> {
        const netAmountPayableText =
            await this.netAmountPayable.innerText();

        return Number(
            netAmountPayableText.replace(/[₹,\s]/g, "")
        );
    }

    async clickAddButton() {
        await this.addButton.click();
    }

    async clickfinalizeButton() {
        await this.click(this.finalizeButton);
    }

    async clickfinalizePopUpButton() {
        await this.click(this.finalizePopUpButton);
    }

    async selectMethodDropdown(method: string) {
        await this.methodDropDownField.selectOption({
            label: method
        });
    }

    async fillAmountField(amount: string) {
        await this.amountField.fill(amount);
    }

    async fillReferenceInputField(reference: string) {
        await this.fill(this.referenceInputField, reference);
    }

    async clickReceiveButton() {
        await this.click(this.receiveButton);
    }

    async clickReceivePopupButton() {
        await this.click(this.receivePopupButton);
    }

    async getReceivedAmount(): Promise<number> {
        const receivedAmountText =
            await this.receivedAmount.innerText();

        return Number(
            receivedAmountText.replace(/[₹,\s]/g, "")
        );
    }

    async getAmountDue(): Promise<number> {
        const amountDueText =
            await this.amountDue.innerText();

        return Number(
            amountDueText.replace(/[₹,\s−-]/g, "")
        );
    }
    async clickBackButton() {
        await this.click(this.backButton)
    }
    async clickSaveDraft() {
        await this.click(this.saveDraft)
    }
    async clickRecievePaymentButton() {
        await this.click(this.recievePaymentButton)
    }
    async enterReceiveAmount(amount: string) {
        await this.fill(this.receiveAmountField, amount);
    }

    async selectPaymentMethod(method: string) {
        await this.methodField.selectOption({ label: method });
    }

    async enterReference(reference: string) {
        await this.fill(this.referenceField, reference);
    }
    async getBillAmounts() {
        const totalText = await this.totalAmount.textContent();
        const paidText = await this.paidAmount.textContent();
        const dueText = await this.dueAmount.textContent();

        const total = Number(totalText?.replace(/[₹,\s]/g, "").replace("Total:", ""));
        const paid = Number(paidText?.replace(/[₹,\s]/g, "").replace("Paid:", ""));
        const due = Number(dueText?.replace(/[₹,\s]/g, "").replace("Due:", ""));

        return {
            total,
            paid,
            due
        };
    }
    async clickReciveButton() {
        await this.click(this.reciveButton)
    }
    async clickOpenBillButton(){
        await this.click(this.openBillButton)
    }
}