import { Page, Locator } from '@playwright/test';
import { BasePage } from '../base/BasePage';

export class BenefitLotsPage extends BasePage {

    readonly createBenefitLotHeading: Locator;
    readonly benifitLotTab: Locator
    readonly programDropdown: Locator;
    readonly lotCodeInput: Locator;
    readonly lotNameInput: Locator;
    readonly walletValueInput: Locator;
    readonly expiryDateInput: Locator;
    readonly discountTaxModeDropdown: Locator;
    readonly codeGenerationModeDropdown: Locator;
    readonly notesInput: Locator;
    readonly closeButton: Locator;
    readonly createButton: Locator;
    readonly cancelButton: Locator;
    readonly newLotButton: Locator;
    readonly createdMessage: Locator;
    readonly expiryDateErrorMessage: Locator;
    readonly backToLotsButton : Locator;
    readonly benifitLotList :Locator;

    constructor(page: Page) {
        super(page);

        this.createBenefitLotHeading = page.getByRole('heading', {
            name: 'Create Benefit Lot'
        });
        this.programDropdown = page.getByLabel('Program');
        this.lotCodeInput = page.getByPlaceholder('e.g., LOT-A-2026');
        this.lotNameInput = page.getByRole('textbox', { name: 'Lot Name*' })
        this.walletValueInput = page.getByLabel('Wallet Value (Rs)');
        this.expiryDateInput = page.getByLabel('Expiry Date');
        this.discountTaxModeDropdown = page.getByLabel('Discount Tax Mode');
        this.codeGenerationModeDropdown = page.getByLabel(
            'Code Generation Mode'
        );
        this.notesInput = page.getByLabel('Notes (optional)');
        this.closeButton = page.getByRole('button', {
            name: 'Close'
        });
        this.createButton = this.page.getByRole('button', { name: 'Create Draft Lot' })
        this.cancelButton = this.page.getByRole('button', { name: 'Create Draft Lot' })
        this.benifitLotTab = this.page.locator('span').filter({ hasText: 'Benefit Lots' })
        this.newLotButton = this.page.getByRole('button', { name: 'New Lot' })
        this.createdMessage = this.page.getByText(/Lot .* created/);
        this.expiryDateErrorMessage = this.page.getByText('Expiry date must be in the future', { exact: true })
        this.backToLotsButton = this.page.getByRole('button', { name: 'Back to Lots' })
        this.benifitLotList = this.page.locator("tbody tr").first().getByRole("button", { name: "Open" })
    }

    async selectProgram(program: string) {
        await this.programDropdown.selectOption(program);
    }

    async enterLotCode(lotCode: string) {
        await this.fill(this.lotCodeInput, lotCode);
    }

    async enterLotName(lotName: string) {
        await this.fill(this.lotNameInput, lotName);
    }

    async enterWalletValue(value: string) {
        await this.fill(this.walletValueInput, value);
    }

    async enterExpiryDate(date: string) {
        await this.fill(this.expiryDateInput, date);
    }

    async selectDiscountTaxMode(mode: string) {
        await this.discountTaxModeDropdown.selectOption(mode);
    }

    async selectCodeGenerationMode(mode: string) {
        await this.codeGenerationModeDropdown.selectOption(mode);
    }
    async enterNotes(notes: string) {
        await this.fill(this.notesInput, notes);
    }

    async clickCreateButton() {
        await this.click(this.createButton);
    }

    async clickCancelButton() {
        await this.click(this.cancelButton);
    }
    async clickCloseButton() {
        await this.click(this.closeButton);
    }
    async clickbenifitLotTab() {
        await this.click(this.benifitLotTab)
    }
    async clicknewLotButton() {
        await this.click(this.newLotButton)
    }
    async clickbackToLotsButton(){
        await this.click(this.backToLotsButton)
    }
    async clickbenifitLotList(){
        await this.click(this.benifitLotList)
    }
}