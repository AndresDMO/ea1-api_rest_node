import Media from '../models/media.model.js';
import BaseRepository from './BaseRepository.js';

const mediaPopulate = [
  { path: 'genre', select: 'name status' },
  { path: 'director', select: 'name status' },
  { path: 'producer', select: 'name status slogan description' },
  { path: 'type', select: 'name description' },
];

class MediaRepository extends BaseRepository {
  constructor() {
    super(Media);
  }

  findAllWithReferences() {
    return this.model.find().populate(mediaPopulate);
  }

  findByIdWithReferences(id) {
    return this.model.findById(id).populate(mediaPopulate);
  }

  updateByIdWithReferences(id, payload) {
    return this.model.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
    }).populate(mediaPopulate);
  }
}

export default MediaRepository;
