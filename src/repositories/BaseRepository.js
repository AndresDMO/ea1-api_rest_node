class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  create(payload) {
    return this.model.create(payload);
  }

  findAll(filter = {}) {
    return this.model.find(filter);
  }

  findById(id) {
    return this.model.findById(id);
  }

  findOne(filter = {}) {
    return this.model.findOne(filter);
  }

  updateById(id, payload) {
    return this.model.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
    });
  }

  deleteById(id) {
    return this.model.findByIdAndDelete(id);
  }
}

export default BaseRepository;
