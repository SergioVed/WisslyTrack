import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";

async function start() {
    const app = await NestFactory.create(AppModule);
    const port = process.env.PORT || 5000;

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true
        })
    )

    await app.listen(port, () => {
        console.log(`Server started on port ${port}`)
    });

  

}

start();

