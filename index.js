const express = require('express');
const app = express();

require('dotenv').config({ path: '.env.example' });
const port = process.env.PORT;

const healthyRoute = require('./src/routes/healthyRoute');
const notFoundMiddleware = require('./src/middlewares/notFoundMiddleware');

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/healthy', healthyRoute);

app.use(notFoundMiddleware);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});