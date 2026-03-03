"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Email = void 0;
class Email {
    value;
    constructor(email) {
        if (!this.isValid(email)) {
            throw new Error('Invalid email format');
        }
        this.value = email;
    }
    isValid(email) {
        return email.includes('@');
    }
    getValue() {
        return this.value;
    }
    equals(other) {
        return this.value === other.value;
    }
}
exports.Email = Email;
//# sourceMappingURL=email.vo.js.map