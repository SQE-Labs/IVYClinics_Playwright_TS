import { Locator, Page } from "@playwright/test";
import { BasePage } from "../base/BasePage";

export class DashboardPage extends BasePage {
  private readonly greetingHeading: Locator;
  readonly patientsTile: Locator;
  readonly appointmentsTile: Locator;
  readonly communicationTile: Locator;
  readonly newPatientButton: Locator;
  readonly bookAppointmentButton: Locator;
  readonly clinicsDropdown: Locator;
  readonly selectClinicOption: Function;
  readonly welcomeText: Locator;
  readonly patientsPageHeading: Locator;
  readonly appointmentsPageHeading: Locator;
  readonly communicationsPageHeading: Locator;
  readonly patientRegistrationPageheading: Locator;
  readonly bookAppointmentPageheading: Locator;

  constructor(page: Page) {
    super(page);
    this.greetingHeading = page.getByRole("heading", {
      name: /^Good (a|b|c), Demo$/,
    });

    this.patientsTile = page.getByRole("heading", { name: "Patients" });

    this.appointmentsTile = page.getByRole("heading", { name: "Appointments" });

    this.communicationTile = page.getByRole("heading", {
      name: "communications",
    });

    this.newPatientButton = page.getByRole("link", { name: "New Patient" });

    this.bookAppointmentButton = page.getByRole("link", {
      name: "Book Appointment",
    });

    this.clinicsDropdown = page.locator("(//header)[1]/div[2]");

    this.selectClinicOption = (clinicName: string) =>
      page.getByRole("option", { name: clinicName });

    this.welcomeText = page.getByText(/Welcome to/i);

    this.patientsPageHeading = page.getByRole("heading", { name: "patients" });

    this.appointmentsPageHeading = page.getByRole("heading", {
      name: "Appointments",
    });

    this.communicationsPageHeading = page.getByRole("heading", {
      name: "Communications",
    });

    this.patientRegistrationPageheading = page.getByRole("heading", {
      name: "Patient Registration",
    });

    this.bookAppointmentPageheading = page.getByRole("heading", {
      name: "Book Appointment",
    });
  }

  async verifyGreetingVisible() {
    await this.expectToBeVisible(this.greetingHeading);
  }

  async waitForDashboard() {
    await this.waitForElement(this.greetingHeading);
  }

  async clickPatientsTile() {
    await this.click(this.patientsTile);
  }
  async clickAppointmentTile() {
    await this.click(this.appointmentsTile);
  }
  async clickCommunicationTile() {
    await this.click(this.communicationTile);
  }
  async clickNewPatientButton() {
    await this.click(this.newPatientButton);
  }
  async clickBookAppointmentButton() {
    await this.click(this.bookAppointmentButton);
  }
  async clickClinicsDropdown() {
    await this.waitForElement(this.clinicsDropdown);
    await this.click(this.clinicsDropdown);
  }
  async selectClinic(clinicName: string) {
    await this.click(this.selectClinicOption(clinicName));
  }
}
