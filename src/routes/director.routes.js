import buildCrudRouter from './buildCrudRouter.js';
import directorController from '../controllers/director.controller.js';

const directorRouter = buildCrudRouter(directorController, { includeActive: true });

export default directorRouter;
