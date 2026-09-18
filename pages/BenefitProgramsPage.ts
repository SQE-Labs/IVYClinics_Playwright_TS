import { Locator, Page } from "@playwright/test";
import { BasePage } from "../base/BasePage"

export class BenefitProgramsPage extends BasePage {

    readonly benefitProgramsTab: Locator;
    readonly benefitProgramsHeading: Locator;
    readonly addProgramButton: Locator;
    readonly addProgramHeading: Locator;
    readonly programCodeInput: Locator;
    readonly programNameInput: Locator;
    readonly instrumentTypeDropdown: Locator;
    readonly statusDropdown: Locator;
    readonly descriptionField: Locator;
    readonly createProgramButton: Locator;
    readonly successMessage: Locator;
    readonly editProgramHeading: Locator;
    readonly updateProgramButton: Locator;
    readonly updateSuccessMessage: Locator;
    readonly duplicateProgramCodeMessage: Locator;
    readonly cancelButton: Locator;
    readonly closeModalButton: Locator;
    readonly programCodeValidationMessage: Locator;
    readonly benefitProgramsTable: Locator;

    constructor(page: Page) {
        super(page);

        this.benefitProgramsTab = page.getByRole('link', { name: 'Benefit Programs' })
        this.benefitProgramsHeading = page.getByRole('heading', { name: 'Benefit Programs' })
        this.addProgramButton = page.getByRole('button', { name: 'Add Program' })
        this.addProgramHeading = page.getByRole('heading', { name: 'Add Program' })
        this.programCodeInput = page.getByRole('textbox', { name: 'Program Code*' })
        this.programNameInput = page.getByRole('textbox', { name: 'Program Name*' })
        this.instrumentTypeDropdown = page.getByLabel('Instrument Type')
        this, this.statusDropdown = page.getByLabel('Status')
        this.descriptionField = page.getByRole('textbox', { name: 'Description (optional)' })
        this.createProgramButton = page.getByRole('button', { name: 'Create Program' })
        this.successMessage = this.page.locator('[role="alert"]').filter({ hasText: 'Program Created' })
        this.editProgramHeading = page.getByRole('heading', { name: 'Edit Program' });
        this.updateProgramButton = page.getByRole('button', { name: 'Update Program' });
        this.updateSuccessMessage = this.page.locator('[role="alert"]').filter({ hasText: 'Program updated' });
        this.duplicateProgramCodeMessage = this.page.locator('[role="alert"]').filter({ hasText: 'already exists' });
        this.cancelButton = page.getByRole('button', { name: 'Cancel' });
        this.closeModalButton = page.getByRole('button', { name: 'Close modal' });
        this.programCodeValidationMessage = this.page.locator('[role="alert"]').filter({ hasText: 'size must be between 0 and 50' });
        this.benefitProgramsTable = page.getByRole('table')
    }

    // Methods
    async clickBenefitProgramsTab() {
        await this.click(this.benefitProgramsTab);
    }

    async clickAddProgramButton() {
        await this.click(this.addProgramButton);
    }

    async fillProgramCode(programCode: string) {
        await this.fill(this.programCodeInput, programCode);
    }

    async fillProgramName(programName: string) {
        await this.fill(this.programNameInput, programName);
    }

    async selectInstrumentType(instrumentType: string) {
        await this.instrumentTypeDropdown.selectOption(instrumentType);
    }

    async selectStatus(status: string) {
        await this.statusDropdown.selectOption(status);
    }

    async fillDescription(description: string) {
        await this.fill(this.descriptionField, description);
    }

    async clickCreateProgramButton() {
        await this.click(this.createProgramButton);
    }

    async getProgramRow(programCode: string): Promise<Locator> {
        return this.page.locator('tr').filter({ hasText: programCode });
    }

    async clickEditForProgram(programCode: string) {
        const programRow = await this.getProgramRow(programCode);
        await programRow.getByRole('button', { name: 'Edit' }).click();
    }

    async clickUpdateProgramButton() {
        await this.click(this.updateProgramButton);
    }

    async clickCancelButton() {
        await this.click(this.cancelButton);
    }

    async clickCloseModalButton() {
        await this.click(this.closeModalButton);
    }

    async getFirstProgramRow(): Promise<Locator> {
        return this.benefitProgramsTable.locator('tbody tr').first();
    }

    async getFirstProgramEditButton(): Promise<Locator> {
        const programRow = await this.getFirstProgramRow();
        return programRow.getByRole('button', { name: 'Edit', exact: true });
    }

}