import { Router } from 'express';

import { router as libraryRouter } from './library';

export const router = Router();

router.use('/library', libraryRouter);
