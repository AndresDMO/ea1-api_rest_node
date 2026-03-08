import Director from '../models/director.model.js';
import BaseRepository from '../repositories/BaseRepository.js';
import ActivableService from './ActivableService.js';

const directorRepository = new BaseRepository(Director);

class DirectorService extends ActivableService {
  constructor(repository) {
    super(repository, 'Director');
  }
}

const directorService = new DirectorService(directorRepository);

export default directorService;
