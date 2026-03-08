import { Router } from 'express';
import genreRouter from './genre.routes.js';
import directorRouter from './director.routes.js';
import producerRouter from './producer.routes.js';
import typeRouter from './type.routes.js';
import mediaRouter from './media.routes.js';

const router = Router();

router.use('/genres', genreRouter);
router.use('/directors', directorRouter);
router.use('/producers', producerRouter);
router.use('/types', typeRouter);
router.use('/media', mediaRouter);

export default router;
