import mongoose from 'mongoose';

const typeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      trim: true,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

typeSchema.index({ name: 1 }, { unique: true });

const Type = mongoose.model('Type', typeSchema);

export default Type;
