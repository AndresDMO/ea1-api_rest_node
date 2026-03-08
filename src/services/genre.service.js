import Genre from '../models/genre.model.js';
import BaseRepository from '../repositories/BaseRepository.js';
import ActivableService from './ActivableService.js';

const genreRepository = new BaseRepository(Genre);

class GenreService extends ActivableService {
  constructor(repository) {
    super(repository, 'Genre');
  }
}

const genreService = new GenreService(genreRepository);

export default genreService;
