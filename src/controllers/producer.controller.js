import createCrudController from './createCrudController.js';
import producerService from '../services/producer.service.js';

const producerController = createCrudController(producerService, {
  includeActive: true,
});

export default producerController;
