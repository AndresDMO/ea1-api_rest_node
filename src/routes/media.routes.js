import buildCrudRouter from './buildCrudRouter.js';
import mediaController from '../controllers/media.controller.js';

const mediaRouter = buildCrudRouter(mediaController);

export default mediaRouter;
