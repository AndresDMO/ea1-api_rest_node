import createCrudController from './createCrudController.js';
import typeService from '../services/type.service.js';

const typeController = createCrudController(typeService);

export default typeController;
