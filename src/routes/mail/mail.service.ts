import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async registerMail(email: string, context: any) {
    // const path = 'D:/nep-mgmt/src/routes/mail/templates';
    await this.mailerService.sendMail({
      to: email,
      subject: 'Demo Mail for test',
      template: 'alternate',
      context: {
        username: email,
        name: context.name,
        password: context.password,
      },
    });
  }
}
