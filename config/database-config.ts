import { registerAs } from "@nestjs/config";

export default registerAs(
  'database',
  () => ({
      type: process.env.DB_TYPE,
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10) || 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: ['dist/**/*.entity.js'],
      synchronize: true,
      migrations: [
        './dist/src/db/migrations/*.js'
      ],
      cli: {
        migrationsDir: 'src/db/migrations'
      }
  }),
);