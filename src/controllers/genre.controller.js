import createCrudController from './createCrudController.js';
import genreService from '../services/genre.service.js';

const genreController = createCrudController(genreService, { includeActive: true });

export default genreController;
