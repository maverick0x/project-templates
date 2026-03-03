"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const create_user_usecase_1 = require("../application/use-cases/create-user.usecase");
const get_user_usecase_1 = require("../application/use-cases/get-user.usecase");
const list_users_usecase_1 = require("../application/use-cases/list-users.usecase");
const update_user_usecase_1 = require("../application/use-cases/update-user.usecase");
const delete_user_usecase_1 = require("../application/use-cases/delete-user.usecase");
let UserController = class UserController {
    createUserUseCase;
    getUserUseCase;
    listUsersUseCase;
    deleteUserUseCase;
    updateUserUseCase;
    constructor(createUserUseCase, getUserUseCase, listUsersUseCase, deleteUserUseCase, updateUserUseCase) {
        this.createUserUseCase = createUserUseCase;
        this.getUserUseCase = getUserUseCase;
        this.listUsersUseCase = listUsersUseCase;
        this.deleteUserUseCase = deleteUserUseCase;
        this.updateUserUseCase = updateUserUseCase;
    }
    async createUser(request) {
        const user = await this.createUserUseCase.execute(request);
        return user.mapToResponse();
    }
    async getUser(id) {
        const user = await this.getUserUseCase.execute(id);
        return user.mapToResponse();
    }
    async listUsers() {
        const users = await this.listUsersUseCase.execute();
        return users.map((user) => user.mapToResponse());
    }
    async updateUser(id, dto) {
        const user = await this.updateUserUseCase.execute(id, dto);
        return user.mapToResponse();
    }
    async deleteUser(id) {
        await this.deleteUserUseCase.execute(id);
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createUser", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUser", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "listUsers", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUser", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUser", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)({
        path: 'user',
        version: '1',
    }),
    __metadata("design:paramtypes", [create_user_usecase_1.CreateUserUseCase,
        get_user_usecase_1.GetUserUseCase,
        list_users_usecase_1.ListUsersUseCase,
        delete_user_usecase_1.DeleteUserUseCase,
        update_user_usecase_1.UpdateUserUseCase])
], UserController);
//# sourceMappingURL=user.controller.js.map