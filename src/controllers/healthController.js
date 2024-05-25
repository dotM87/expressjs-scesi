exports.getHealthStatus = (req, res) => {
  res.status(200).json({
    health: "live",
    status: res.statusCode,
    message: "ok"
  });
};
