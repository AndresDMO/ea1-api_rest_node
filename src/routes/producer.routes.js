import buildCrudRouter from './buildCrudRouter.js';
import producerController from '../controllers/producer.controller.js';

const producerRouter = buildCrudRouter(producerController, { includeActive: true });

export default producerRouter;
