import ApiError from '../utils/ApiError.js';

class BaseCrudService {
  constructor(repository, entityName) {
    this.repository = repository;
    this.entityName = entityName;
  }

  async create(payload) {
    return this.repository.create(payload);
  }

  async findAll() {
    return this.repository.findAll();
  }

  async findById(id) {
    const entity = await this.repository.findById(id);

    if (!entity) {
      throw new ApiError(404, `${this.entityName} not found`);
    }

    return entity;
  }

  async update(id, payload) {
    const updated = await this.repository.updateById(id, payload);

    if (!updated) {
      throw new ApiError(404, `${this.entityName} not found`);
    }

    return updated;
  }

  async remove(id) {
    const deleted = await this.repository.deleteById(id);

    if (!deleted) {
      throw new ApiError(404, `${this.entityName} not found`);
    }

    return deleted;
  }
}

export default BaseCrudService;
