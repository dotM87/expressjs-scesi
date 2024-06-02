import express, { Request, Response } from 'express';
import { getHealthStatus } from '../controllers/healthyController';

const healthyRoute = express.Router();

healthyRoute.get('/', (req: Request, res: Response) => {
    getHealthStatus(req, res);
});

export default healthyRoute;
