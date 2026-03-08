import buildCrudRouter from './buildCrudRouter.js';
import genreController from '../controllers/genre.controller.js';

const genreRouter = buildCrudRouter(genreController, { includeActive: true });

export default genreRouter;
