import { Email } from '../value-objects/email.vo';
import { UserId } from '../value-objects/user-id.vo';
export declare class User {
    private readonly id;
    private name;
    private email;
    private createdAt;
    private updatedAt;
    constructor(id: UserId, name: string, email: Email, createdAt: Date, updatedAt: Date);
    static create(name: string, email: string): User;
    getId(): UserId;
    getName(): string;
    getEmail(): Email;
    getCreatedAt(): Date;
    getUpdatedAt(): Date;
    updateName(name: string): void;
    updateEmail(email: string): void;
    getAccountAge(): number;
    mapToResponse(): {
        id: string;
        name: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
        accountAge: number;
    };
}
