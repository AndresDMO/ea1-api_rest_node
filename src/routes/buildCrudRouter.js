import { Router } from 'express';
import validateObjectId from '../middlewares/validateObjectId.js';

function buildCrudRouter(controller, options = {}) {
  const { includeActive = false } = options;
  const router = Router();

  router.post('/', controller.create);
  router.get('/', controller.getAll);

  if (includeActive && controller.getActive) {
    router.get('/active', controller.getActive);
  }

  router.get('/:id', validateObjectId, controller.getById);
  router.put('/:id', validateObjectId, controller.update);
  router.delete('/:id', validateObjectId, controller.remove);

  return router;
}

export default buildCrudRouter;
