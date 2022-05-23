import express, { Express } from 'express';
import swaggerUi from 'swagger-ui-express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';

import { router as appRouter } from './routes/index';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(cors());
app.use(morgan("tiny"));
app.use(express.static("public"));
app.use(
    "/docs",
    swaggerUi.serve,
    swaggerUi.setup(undefined, {
        swaggerOptions: {
            url: "/swagger.json",
        },
    }));
app.use('/api', appRouter);
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
