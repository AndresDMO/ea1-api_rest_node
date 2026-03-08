import Genre from '../models/genre.model.js';
import Director from '../models/director.model.js';
import Producer from '../models/producer.model.js';
import Type from '../models/type.model.js';
import BaseRepository from '../repositories/BaseRepository.js';
import MediaRepository from '../repositories/MediaRepository.js';
import BaseCrudService from './BaseCrudService.js';
import ApiError from '../utils/ApiError.js';
import { STATUS } from '../constants/status.js';

const mediaRepository = new MediaRepository();
const genreRepository = new BaseRepository(Genre);
const directorRepository = new BaseRepository(Director);
const producerRepository = new BaseRepository(Producer);
const typeRepository = new BaseRepository(Type);

class MediaService extends BaseCrudService {
  constructor(repositories) {
    super(repositories.mediaRepository, 'Media');
    this.genreRepository = repositories.genreRepository;
    this.directorRepository = repositories.directorRepository;
    this.producerRepository = repositories.producerRepository;
    this.typeRepository = repositories.typeRepository;
  }

  async validateReferences(payload) {
    const checks = [];

    if (payload.genre) {
      checks.push(
        this.validateSingleReference(
          payload.genre,
          this.genreRepository,
          'Genre',
          true
        )
      );
    }

    if (payload.director) {
      checks.push(
        this.validateSingleReference(
          payload.director,
          this.directorRepository,
          'Director',
          true
        )
      );
    }

    if (payload.producer) {
      checks.push(
        this.validateSingleReference(
          payload.producer,
          this.producerRepository,
          'Producer',
          true
        )
      );
    }

    if (payload.type) {
      checks.push(
        this.validateSingleReference(payload.type, this.typeRepository, 'Type', false)
      );
    }

    await Promise.all(checks);
  }

  async validateSingleReference(id, repository, entityName, mustBeActive) {
    const entity = await repository.findById(id);

    if (!entity) {
      throw new ApiError(400, `${entityName} does not exist`);
    }

    if (mustBeActive && entity.status !== STATUS.ACTIVE) {
      throw new ApiError(400, `${entityName} must be active`);
    }
  }

  async create(payload) {
    await this.validateReferences(payload);
    return this.repository.create(payload);
  }

  async findAll() {
    return this.repository.findAllWithReferences();
  }

  async findById(id) {
    const media = await this.repository.findByIdWithReferences(id);

    if (!media) {
      throw new ApiError(404, 'Media not found');
    }

    return media;
  }

  async update(id, payload) {
    await this.validateReferences(payload);

    const updated = await this.repository.updateByIdWithReferences(id, payload);

    if (!updated) {
      throw new ApiError(404, 'Media not found');
    }

    return updated;
  }
}

const mediaService = new MediaService({
  mediaRepository,
  genreRepository,
  directorRepository,
  producerRepository,
  typeRepository,
});

export default mediaService;
