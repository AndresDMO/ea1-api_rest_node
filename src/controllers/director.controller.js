import createCrudController from './createCrudController.js';
import directorService from '../services/director.service.js';

const directorController = createCrudController(directorService, {
  includeActive: true,
});

export default directorController;
