import { Request, Response } from 'express';

import { IBookService } from '../services/IBookService';
import { ErrorCodes } from './ErrorCodes';

export class LibraryController {
    constructor(
        private _bookService: IBookService,
        private _req: Request,
        private _res: Response) {}

    listAuthorBooks(authorName: string): void {
        if (authorName === '')
            this._res
                .status(400)
                .json({
                    error: ErrorCodes.PARAMETER_EMPTY,
                    parameter: 'author-name'
                });
        else {
            const books = this._bookService.findAuthorsBooks(authorName);

            this._res.status(200).json(books);
        }
    }

    findBook(bookTitle: string): void {
        if (bookTitle === '') 
            this._res
                .status(400)
                .json({
                    error: ErrorCodes.PARAMETER_EMPTY,
                    parameter: 'book-title'
                });
        else {
            const books = this._bookService.findBook(bookTitle);

            if (books.length > 0)
                this._res.status(200).json(books);
            else
                this._res
                    .status(404)
                    .json({
                        error: ErrorCodes.OBJECT_NOT_EXISTING
                    });
        }
    }

    borrowBook(isbn: string, userName: string): void {
        if (isbn === '')
            this._res
                .status(400)
                .json({
                    error: ErrorCodes.PARAMETER_EMPTY,
                    parameter: 'isbn'
                });
        else if (userName === '')
            this._res
                .status(400)
                .json({
                    error: ErrorCodes.PARAMETER_EMPTY,
                    parameter: 'user-name'
                });
        else {
            const book = this._bookService.findBook(isbn);

            if (book === undefined) 
                this._res
                    .status(404)
                    .json({
                        error: ErrorCodes.OBJECT_NOT_EXISTING
                    });
            else {
                
            }
        }
    }

    returnBook(): void {

    }

    listStock(): void {
        const books = this._bookService.getAllBooks();

        this._res.status(200).json(books);
    }
}
