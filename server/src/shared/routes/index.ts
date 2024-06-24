import { Router } from 'express';

import { fileRoutes } from './file.routes';

const router = Router();

router.use('/file', fileRoutes);

export { router }