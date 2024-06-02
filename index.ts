import express, { Application, Express, Request, Response } from 'express';
import dotenv from 'dotenv';

import healthyRoute from '@/routes/healthyRoute';
import productRoute from '@/routes/productRoute';

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 5000;



app.use(express.json());
app.use('/healthy', healthyRoute);
app.use('/products', productRoute);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});