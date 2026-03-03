"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryUserRepository = void 0;
const common_1 = require("@nestjs/common");
let InMemoryUserRepository = class InMemoryUserRepository {
    users = new Map();
    save(user) {
        this.users.set(user.getId().getValue(), user);
        return user;
    }
    findById(id) {
        return this.users.get(id) || null;
    }
    findByEmail(email) {
        const users = Array.from(this.users.values());
        return users.find((user) => user.getEmail().getValue() === email) || null;
    }
    findAll() {
        return Array.from(this.users.values());
    }
    delete(id) {
        this.users.delete(id);
    }
};
exports.InMemoryUserRepository = InMemoryUserRepository;
exports.InMemoryUserRepository = InMemoryUserRepository = __decorate([
    (0, common_1.Injectable)()
], InMemoryUserRepository);
//# sourceMappingURL=in-memory-user-repository.js.map