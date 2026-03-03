"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const email_vo_1 = require("../value-objects/email.vo");
const user_id_vo_1 = require("../value-objects/user-id.vo");
class User {
    id;
    name;
    email;
    createdAt;
    updatedAt;
    constructor(id, name, email, createdAt, updatedAt) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
    static create(name, email) {
        if (!name || name.trim().length < 2) {
            throw new Error("Name must be at least 2 characters long");
        }
        return new User(new user_id_vo_1.UserId(), name.trim(), new email_vo_1.Email(email), new Date(), new Date());
    }
    getId() {
        return this.id;
    }
    getName() {
        return this.name;
    }
    getEmail() {
        return this.email;
    }
    getCreatedAt() {
        return this.createdAt;
    }
    getUpdatedAt() {
        return this.updatedAt;
    }
    updateName(name) {
        if (!name || name.trim().length < 2) {
            throw new Error("Name must be at least 2 characters long");
        }
        this.name = name;
        this.updatedAt = new Date();
    }
    updateEmail(email) {
        this.email = new email_vo_1.Email(email);
        this.updatedAt = new Date();
    }
    getAccountAge() {
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - this.createdAt.getTime());
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }
    mapToResponse() {
        return {
            id: this.id.getValue(),
            name: this.getName(),
            email: this.email.getValue(),
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            accountAge: this.getAccountAge()
        };
    }
}
exports.User = User;
//# sourceMappingURL=user_entity.js.map