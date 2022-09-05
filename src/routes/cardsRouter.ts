import { Router } from 'express';
import { cardsMiddleware } from "../middlewares/cardsMiddleware";
import { newCard } from "../controllers/cardsController";

const router = Router();



router.post("/cards/new", cardsMiddleware, newCard);

export default router;