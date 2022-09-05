import { Request, Response, NextFunction } from "express";

import cardsSchema from "../schemas/cardsSchema";

export async function cardsMiddleware(req: Request, res: Response, next: NextFunction) {
   
    
    const validate = cardsSchema.validate(req.body);

    if (validate.error) {
        return res.sendStatus(422);
    }

    next();
}