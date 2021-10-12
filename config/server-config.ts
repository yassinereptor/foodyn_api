import { registerAs } from "@nestjs/config";

export default registerAs(
    'server',
    () => ({
      name: process.env.SERVER_NAME,
      jwt_secret: process.env.JWT_SECRET,
      port: parseInt(process.env.SERVER_PORT, 10) || 3000,
      host: process.env.SERVER_HOST,
      link: process.env.SERVER_LINK
    }),
  );