import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from "dotenv"

dotenv.config()

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const whitelist = ["http://localhost:3000"]
  app.enableCors({
    origin: function (origin, callback) {
      if (!origin || whitelist.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    },credentials: true
  });
  await app.listen(process.env.PORT || 5000 );
}
bootstrap();
