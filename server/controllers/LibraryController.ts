import { Request, Response } from 'express';

import { Book } from '../models/Book';

import { IBookRepository } from '../repositories/IBookRepository';

export class LibraryController {
    constructor(private bookRepo: IBookRepository) {}

    listAuthorBooks(req: Request, res: Response, maybeAuthorName: string): void {
        const books = this.bookRepo.findAuthorsBooks(maybeAuthorName);

        res.status(200).json(books);
    }

    findBook(req: Request, res: Response, maybeTitle: string): void {
        const books = this.bookRepo.findBook(maybeTitle);

        if (books.length > 0)
            res.status(200).json(books);
        else
            res.status(404);
    }

    borrowBook(): void {

    }

    returnBook(): void {

    }

    listStock(req: Request, res: Response): void {
        const books = this.bookRepo.getAllBooks();

        res.status(200).json(books);
    }
}
