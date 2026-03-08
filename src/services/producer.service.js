import Producer from '../models/producer.model.js';
import BaseRepository from '../repositories/BaseRepository.js';
import ActivableService from './ActivableService.js';

const producerRepository = new BaseRepository(Producer);

class ProducerService extends ActivableService {
  constructor(repository) {
    super(repository, 'Producer');
  }
}

const producerService = new ProducerService(producerRepository);

export default producerService;
