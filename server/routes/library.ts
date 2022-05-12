import Express from 'express';

import { LibraryController } from '../controllers/LibraryController';
import { readLibrary } from '../infrastructure/fileReading';
import { BookRepository } from '../repositories/BookRepository';

export const router = Express.Router();

const libfile = process.env.npm_config_libfile || 'data/default.tsv';

readLibrary(libfile, (books) => {
    const bookSearchSensitivity = parseInt(process.env.BOOK_SEARCH_SENSITIVITY!);
    const authorSearchSensitivity = parseInt(process.env.AUTHOR_SEARCH_SENSITIVITY!);
    const bookRepo = new BookRepository(bookSearchSensitivity, authorSearchSensitivity, books);
    const controller = new LibraryController(bookRepo);
    
    router.get(
        '/author-books', 
        (req, res) => controller.listAuthorBooks(req, res, (req.query['author-name'] as string) || ''));    
    router.get(
        '/find-book',
        (req, res) => controller.findBook(req, res, (req.query['book-title'] as string) || ''));
    router.get(
        '/list-stock',
        (req, res) => controller.listStock(req, res));
});
