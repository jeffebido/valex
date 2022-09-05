import { Request, Response } from 'express';

import * as cardsService from '../services/cardsService';


export async function newCard(req: Request, res: Response) {
    
    const teste = await cardsService.newCard(req.body.employeeId, req.body.type) ;

    res.send( teste);
}