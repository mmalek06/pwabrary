import Express from 'express';

import { LibraryController } from '../controllers/LibraryController';
import { readLibrary } from '../infrastructure/fileReading';
import { BookService } from '../services/BookService';

export const router = Express.Router();

const libfile = process.env.npm_config_libfile || 'data/default.tsv';

readLibrary(libfile, (books) => {
    const bookSearchSensitivity = parseInt(process.env.BOOK_SEARCH_SENSITIVITY!);
    const authorSearchSensitivity = parseInt(process.env.AUTHOR_SEARCH_SENSITIVITY!);
    const bookService = new BookService(bookSearchSensitivity, authorSearchSensitivity, books);
    
    router.get(
        '/author-books', 
        (req, res) => new LibraryController(bookService, req, res).listAuthorBooks((req.query['author-name'] as string) || ''));    
    router.get(
        '/find-book',
        (req, res) => new LibraryController(bookService, req, res).findBook((req.query['book-title'] as string) || ''));
    router.get(
        '/list-stock',
        (req, res) => new LibraryController(bookService, req, res).listStock());
    router.post(
        '/borrow-book',
        (req, res) => new LibraryController(bookService, req, res).borrowBook((req.query['isbn'] as string) || '', (req.query['user-name'] as string) || ''));
});
