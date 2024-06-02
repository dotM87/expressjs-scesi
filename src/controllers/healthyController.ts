import { Request, Response } from 'express';

export const getHealthStatus = (req: Request, res: Response): void => {
    res.status(200).json({ 
        health: "live",
        status: res.statusCode,
        message: "ok" 
    });
};