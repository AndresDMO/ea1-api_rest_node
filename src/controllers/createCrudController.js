import asyncHandler from '../utils/asyncHandler.js';

function createCrudController(service, options = {}) {
  const { includeActive = false } = options;

  const controller = {
    create: asyncHandler(async (req, res) => {
      const created = await service.create(req.body);
      res.status(201).json(created);
    }),

    getAll: asyncHandler(async (req, res) => {
      const items = await service.findAll();
      res.json(items);
    }),

    getById: asyncHandler(async (req, res) => {
      const item = await service.findById(req.params.id);
      res.json(item);
    }),

    update: asyncHandler(async (req, res) => {
      const updated = await service.update(req.params.id, req.body);
      res.json(updated);
    }),

    remove: asyncHandler(async (req, res) => {
      const deleted = await service.remove(req.params.id);
      res.json({
        message: 'Deleted successfully',
        item: deleted,
      });
    }),
  };

  if (includeActive) {
    controller.getActive = asyncHandler(async (req, res) => {
      const items = await service.findActive();
      res.json(items);
    });
  }

  return controller;
}

export default createCrudController;
