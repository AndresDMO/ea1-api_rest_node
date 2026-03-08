import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import routes from './routes/index.js';
import { notFoundHandler, errorHandler } from './middlewares/errorHandlers.js';

const app = express();

app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use(morgan('dev'));

app.get('/api/health', (req, res) => {
  res.json({ message: 'API activa' });
});

app.use('/api', routes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
