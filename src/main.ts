import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  
  app.useGlobalPipes(
    new ValidationPipe({
      //*  If your DTO expects email and password, but the user sends email, password, and hack, this setting silently deletes hack.
      whitelist: true,              // Strips properties that are not in the DTO
      forbidNonWhitelisted: true,   // Throws an error if extra properties are sent, instead of silently deleting hack, the API will reject the request completely, saying "property 'hack' should not exist."
      transform: true,              // Automatically converts the payload to an instance of the DTO class.
      disableErrorMessages: false   // Set to false during development to see what is wrong
    })
  );

  

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
