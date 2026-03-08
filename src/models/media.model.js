import mongoose from 'mongoose';

const mediaSchema = new mongoose.Schema(
  {
    serial: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    synopsis: {
      type: String,
      required: true,
      trim: true,
    },
    url: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    coverImage: {
      type: String,
      trim: true,
      default: '',
    },
    releaseYear: {
      type: Number,
      required: true,
      min: 1888,
      max: new Date().getFullYear() + 5,
    },
    genre: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Genre',
      required: true,
    },
    director: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Director',
      required: true,
    },
    producer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Producer',
      required: true,
    },
    type: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Type',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Media = mongoose.model('Media', mediaSchema);

export default Media;
