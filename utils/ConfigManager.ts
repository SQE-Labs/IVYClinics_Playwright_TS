import testData from "../test-data/test-data.json";

export class ConfigManager {
  private static env = process.env.ENV || "uat";

  private static userType = process.env.USER_TYPE || "owner";

  static getEnvironment() {
    const environment =
      testData.environments[this.env as keyof typeof testData.environments];

    if (!environment) {
      throw new Error(`Environment '${this.env}' not found`);
    }

    return environment;
  }

  static getCredentials() {
    const user =
      testData.credentials[this.userType as keyof typeof testData.credentials];

    if (!user) {
      throw new Error(`User '${this.userType}' not found`);
    }

    return {
      email: Buffer.from(user.email, "base64").toString("utf8"),

      password: Buffer.from(user.password, "base64").toString("utf8"),
    };
  }
}
