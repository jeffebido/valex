import { Request, Response, NextFunction } from "express";
import * as repositorie from '../repositories/companyRepository';

export async function apiMiddleware(req: Request, res: Response, next: NextFunction) {


    const apiKey : any = req.headers['x-api-key'];

    const company = await  repositorie.findByApiKey(apiKey);
    
    if ( !company ) {
        return res.sendStatus(401);
    }

    res.locals.company = company;

    next();
} 