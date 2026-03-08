import BaseCrudService from './BaseCrudService.js';
import { STATUS } from '../constants/status.js';

class ActivableService extends BaseCrudService {
  async findActive() {
    return this.repository.findAll({ status: STATUS.ACTIVE });
  }
}

export default ActivableService;
