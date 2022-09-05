import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import cardsRouter from './routes/cardsRouter';

dotenv.config();

const app = express();

app.use(express.json());

app.use(cors());

app.use(cardsRouter);

const PORT = process.env.PORT || '5000';
const HOST = '127.0.0.1';

app.listen({ port: PORT, host: HOST},  () => {
    console.log(`Server is listening on port ${PORT}.`);
});