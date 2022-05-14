import express, { Express } from 'express';
import dotenv from 'dotenv';

import { router as appRouter } from './routes/index';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use('/api', appRouter);
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
