import { Request, Response, NextFunction } from "express";

import * as cardRepository from '../repositories/cardRepository';

import cardsSchema from "../schemas/cardsSchema";

export async function cardsMiddleware(req: Request, res: Response, next: NextFunction) {
   
    const validate = cardsSchema.validate(req.body);

    if (validate.error) {
        return res.sendStatus(422);
    }

    const cardByType = await cardRepository.findByTypeAndEmployeeId(req.body.type, req.body.employeeId);

    if (cardByType) {
        return res.sendStatus(409);
    }

    next();
}