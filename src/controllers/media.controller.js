import createCrudController from './createCrudController.js';
import mediaService from '../services/media.service.js';

const mediaController = createCrudController(mediaService);

export default mediaController;
