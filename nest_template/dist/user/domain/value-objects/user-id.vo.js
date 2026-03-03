"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserId = void 0;
const crypto_1 = require("crypto");
class UserId {
    value;
    constructor(id) {
        this.value = id || (0, crypto_1.randomUUID)();
    }
    getValue() {
        return this.value;
    }
    equals(other) {
        return this.value === other.value;
    }
}
exports.UserId = UserId;
//# sourceMappingURL=user-id.vo.js.map