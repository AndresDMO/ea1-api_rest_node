function notFoundHandler(req, res) {
  res.status(404).json({ message: 'Recurso no encontrado' });
}

function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }

  if (err?.name === 'ValidationError') {
    const errors = Object.values(err.errors || {}).map((errorItem) =>
      errorItem.message
    );

    return res.status(400).json({
      message: errors[0] || 'Error de validacion',
    });
  }

  if (err?.name === 'CastError') {
    return res.status(400).json({ message: 'Formato de identificador invalido' });
  }

  if (err && err.code === 11000) {
    const field = Object.keys(err.keyPattern || {})[0] || 'campo';
    return res.status(409).json({
      message: `El valor para ${field} ya existe`,
    });
  }

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Error interno del servidor';
  return res.status(statusCode).json({ message });
}

export { notFoundHandler, errorHandler };
