import { Global, Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { EmailService } from './email.service';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import * as process from 'process';
import * as path from 'path';

@Global()
@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        transport: {
          // service: 'Gmail',
          host: configService.get('MAIL_HOST'),
          // port: configService.get('MAIL_PORT'),
          // ignoreTLS: true,
          secure: false,
          // tls: {
          //   // Enable STARTTLS
          //   ciphers: 'TLSv1.3',
          // },
          auth: {
            user: configService.get('MAIL_USERNAME'),
            pass: configService.get('MAIL_PASSWORD'),
          },
        },
        defaults: {
          from: `"No-Reply" <${configService.get('MAIL_FROM')}>`,
        },
        template: {
          dir: process.cwd() + '/src/routes/mail/templates',
          adaptor: new HandlebarsAdapter(),
          options: {
            strict: false,
          },
        },
        options: {
          partials: {
            dir: path.join(process.env.PWD, 'templates/'),
            options: {
              strict: false,
            },
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [MailService, EmailService],
  exports: [MailService],
})
export class MailModule {}
