import express from 'express';
import cors from 'cors';
import bookRoutes from './routes/bookRoutes';

const app = express();

const PORT = 3001 || 3002;

app.use(cors());
app.use(express.json());

app.use('/api', bookRoutes);

app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});
