// admin-seller.module.ts

import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserDocument, UserSchema } from '@/module/core/user/user/schema/user.schema';
import { UserSellerModule } from '@/module/core/user/user-seller/user-seller.module';
import { AdminUserSellerController } from './admin-user-seller.controller';
import { AdminUserSellerService } from './admin-user-seller.service';
import { InterceptorModule } from '@/interceptors/interceptors.module';
import { TenantSubscriptionUsageModule } from '@/module/core/tenant-subscription-usage/tenant-subscription-usage.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserDocument.name, schema: UserSchema }]),
    forwardRef(() => UserSellerModule),
    InterceptorModule,
    TenantSubscriptionUsageModule,
  ],
  providers: [AdminUserSellerService],
  controllers: [AdminUserSellerController],
  exports: [AdminUserSellerService],
})
export class AdminUserSellerModule {}
