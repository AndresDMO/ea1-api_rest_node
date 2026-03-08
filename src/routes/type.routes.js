import buildCrudRouter from './buildCrudRouter.js';
import typeController from '../controllers/type.controller.js';

const typeRouter = buildCrudRouter(typeController);

export default typeRouter;
