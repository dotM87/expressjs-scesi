module.exports = (req, res, next) => {
  res.status(404).json({
    error: 'Not Found',
    status: 404,
    message: 'La ruta solicitada no existe'
  });
};
