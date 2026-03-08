import mongoose from 'mongoose';
import ApiError from '../utils/ApiError.js';

function validateObjectId(req, res, next) {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new ApiError(400, 'Invalid id format'));
  }

  return next();
}

export default validateObjectId;
