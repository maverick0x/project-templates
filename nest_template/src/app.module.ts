import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core/constants';
import { ThrottlerGuard } from '@nestjs/throttler/dist/throttler.guard';
import { ThrottlerModule } from '@nestjs/throttler/dist/throttler.module';
import { UserModule } from './user/user.module';
import { KycModule } from './kyc/kyc.module';

@Module({
  imports: [
    // ENV Configuration
    ConfigModule.forRoot({ isGlobal: true, cache: true }),
    // Rate Limiting
    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: 1000,
        limit: 5,
      },
      {
        name: 'medium',
        ttl: 10000,
        limit: 20,
      },
    ]),
    UserModule,
    KycModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
