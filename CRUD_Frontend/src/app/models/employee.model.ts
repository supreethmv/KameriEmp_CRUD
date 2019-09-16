export class Employee {
    _id: string;
    name: string;
    gender: string;
    email?: string;
    phoneNumber?: number;
    contactPreference: string;
    dateOfBirth: Date;
    department: string;
    isActive: boolean;
    photoPath?: string;
}