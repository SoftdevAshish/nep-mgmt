import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import * as handlebars from 'handlebars';

@Injectable()
export class EmailService {
  private transporter;

  // Load the Handlebars template

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

  async sendMail(to: string, subject: string, context: any) {
    const source = fs.readFileSync(
      'src/routes/mail/templates/test-email.hbs',
      'utf8',
    );
    const template = handlebars.compile(source);

    const emailContent = {
      from: this.configService.get('MAIL_FROM'),
      to: to,
      subject: subject,
      html: template({ ...context }),
    };
    console.log({ ...context });

    // const mailOptions = {
    //   from: this.configService.get('MAIL_FROM'),
    //   to,
    //   subject,
    //   text,
    // };
    // console.log(this.transporter);
    // console.log(mailOptions);

    await this.transporter.sendMail(emailContent);
  }
}
