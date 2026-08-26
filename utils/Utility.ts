export class utils {
    static generateRandomName(length: number = 8): string {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        let name = '';

        for (let i = 0; i < length; i++) {
            name += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return name;
    }

    static generateRandomPhoneNumber(): string {
        const firstDigits = ["9", "8", "7", "6"];
        let phoneNumber = firstDigits[Math.floor(Math.random() * firstDigits.length)];
        for (let i = 0; i < 9; i++) {
            phoneNumber += Math.floor(Math.random() * 10);
        }
        return phoneNumber
    }
}