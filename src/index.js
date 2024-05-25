const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

app.get('/healthy', (req, res) => {
  res.status(200);
  res.json({
    health: "live",
    status: res.statusCode,
    message: "ok"
  });
});

app.use((req, res, next) => {
  res.status(404).json({
    error: 'Not Found',
    status: 404,
    message: 'La ruta solicitada no existe'
  });
});