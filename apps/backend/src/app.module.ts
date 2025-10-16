import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './common/roles.guard';
import { AuthModule } from './auth/auth.module';
import { BullModule } from '@nestjs/bull';
import { QueueModule } from './queues/queue.module';
import { CompetitionsModule } from './competitions/competitions.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ReminderModule } from './reminder/reminder.module';
import { MailboxModule } from './mailbox/mailbox.module';




@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({ isGlobal: true }),
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT || '6379', 10),
      },
    }),
   
    // BullModule.registerQueue({
    //   name: 'registration',
    // }),
    AuthModule, CompetitionsModule, QueueModule, ReminderModule, MailboxModule,],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
