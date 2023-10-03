import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  private transporter;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      service: 'Gmail',
      host: configService.get('MAIL_HOST'),
      port: parseInt(configService.get('MAIL_PORT')),
      secure: JSON.parse(configService.get('MAIL_SECURE')),
      auth: {
        user: configService.get('MAIL_USERNAME'),
        pass: configService.get('MAIL_PASSWORD'),
      },
    });
  }

  async sendMail(to: string, subject: string, text: string) {
    const mailOptions = {
      from: this.configService.get('MAIL_FROM'),
      to,
      subject,
      text,
    };
    console.log(this.transporter);
    console.log(mailOptions);

    await this.transporter.sendMail(mailOptions);
  }
}
