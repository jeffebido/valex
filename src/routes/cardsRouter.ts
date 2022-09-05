import { Router } from 'express';
import { cardsMiddleware } from "../middlewares/cardsMiddleware";
import { apiMiddleware } from "../middlewares/apiMiddleware";
import { newCard } from "../controllers/cardsController";

const router = Router();



router.post("/cards/new", apiMiddleware, cardsMiddleware, newCard);

export default router;