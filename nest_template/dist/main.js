"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const config_service_1 = require("@nestjs/config/dist/config.service");
const index_mjs_1 = __importDefault(require("../node_modules/helmet/index.mjs"));
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_service_1.ConfigService);
    const allowedOrigins = configService.get('ALLOWED_ORIGINS')?.split(',')?.filter(Boolean) ??
        [];
    app.use((0, index_mjs_1.default)());
    app.enableCors({
        origin: process.env.NODE_ENV === 'production' ? allowedOrigins : true,
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'x-api-key'],
        credentials: false,
        maxAge: 86400,
    });
    app.setGlobalPrefix('api');
    app.enableVersioning({
        type: common_1.VersioningType.URI,
        defaultVersion: '1',
        prefix: 'v',
    });
    const port = configService.get('PORT', 3000);
    await app.listen(port);
}
void bootstrap();
//# sourceMappingURL=main.js.map