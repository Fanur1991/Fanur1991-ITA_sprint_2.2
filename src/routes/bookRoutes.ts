import { Router } from 'express';
import {
  fetchAllBooks,
  fetchFiltredBooks,
} from '../controllers/bookControllers';

const router = Router();

router.get('/', fetchAllBooks);
router.get('/books', fetchFiltredBooks);

export default router;
