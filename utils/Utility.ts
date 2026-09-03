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

    static getTodayDate(): string {
        return this.formatDate(new Date());
    }
    static getDateAfterDays(days: number): string {
        const date = new Date();
        date.setDate(date.getDate() + days);
        return this.formatDate(date);
    }
    private static formatDate(date: Date): string {
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const year = date.getFullYear();
        return `${year}-${month}-${day}`;
    }
    static timeToMinutes(time: string): number {
        const [timePart, period] = time.trim().split(/\s+/);
        let [hour, minutes] = timePart.split(':').map(Number);
        if (period.toUpperCase() === 'AM' && hour === 12) {
            hour = 0;
        }
        if (period.toUpperCase() === 'PM' && hour !== 12) {
            hour += 12;
        }
        return hour * 60 + minutes;
    }
}