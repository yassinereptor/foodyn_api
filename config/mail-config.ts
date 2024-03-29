import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";
import { registerAs } from "@nestjs/config";
import { join } from "path";

export default registerAs(
  'mail',
  () => ({
    transport: {
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
    },
    defaults: {
      from: process.env.MAIL_FROM,
    },
    template: {
      dir: join(__dirname, '../mail/templates'),
      adapter: new HandlebarsAdapter(),
      options: {
        strict: true,
      },
    },
  }),
);