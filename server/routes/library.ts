import Express from 'express';

import { LibraryController } from '../controllers/LibraryController';
import { BookRepository } from '../infrastructure/BookRepository';

const router = Express.Router();
const bookSearchSensitivity = parseInt(process.env.BOOK_SEARCH_SENSITIVITY!);
const authorSearchSensitivity = parseInt(process.env.AUTHOR_SEARCH_SENSITIVITY!);
const bookRepo = new BookRepository(bookSearchSensitivity, authorSearchSensitivity, []);
const controller = new LibraryController(bookRepo);

router.get('/author-books', controller.listAuthorBooks);
