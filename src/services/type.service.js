import Type from '../models/type.model.js';
import BaseRepository from '../repositories/BaseRepository.js';
import BaseCrudService from './BaseCrudService.js';

const typeRepository = new BaseRepository(Type);

class TypeService extends BaseCrudService {
  constructor(repository) {
    super(repository, 'Type');
  }
}

const typeService = new TypeService(typeRepository);

export default typeService;
