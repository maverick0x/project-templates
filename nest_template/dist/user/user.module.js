"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const create_user_usecase_1 = require("./application/use-cases/create-user.usecase");
const user_repository_port_1 = require("./application/ports/user.repository.port");
const in_memory_user_repository_1 = require("./infrastructure/adapters/in-memory-user-repository");
const user_controller_1 = require("./presentation/user.controller");
const get_user_usecase_1 = require("./application/use-cases/get-user.usecase");
const list_users_usecase_1 = require("./application/use-cases/list-users.usecase");
const delete_user_usecase_1 = require("./application/use-cases/delete-user.usecase");
const update_user_usecase_1 = require("./application/use-cases/update-user.usecase");
let UserModule = class UserModule {
};
exports.UserModule = UserModule;
exports.UserModule = UserModule = __decorate([
    (0, common_1.Module)({
        controllers: [user_controller_1.UserController],
        providers: [
            create_user_usecase_1.CreateUserUseCase,
            get_user_usecase_1.GetUserUseCase,
            list_users_usecase_1.ListUsersUseCase,
            delete_user_usecase_1.DeleteUserUseCase,
            update_user_usecase_1.UpdateUserUseCase,
            {
                provide: user_repository_port_1.USER_REPOSITORY,
                useClass: in_memory_user_repository_1.InMemoryUserRepository
            }
        ]
    })
], UserModule);
//# sourceMappingURL=user.module.js.map