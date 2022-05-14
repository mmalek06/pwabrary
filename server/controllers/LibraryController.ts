import { Request, Response } from 'express';

import IBookService from '../services/IBookService';
import BaseController from './BaseController';

export class LibraryController extends BaseController {
    constructor(
        private _bookService: IBookService,
        req: Request,
        res: Response) {
        super(res, req);
    }

    listAuthorBooks(authorName: string): void {
        if (authorName === '')
            this._parameterEmpty('author-name');
        else {
            const books = this._bookService.findAuthorsBooks(authorName);

            this._res.status(200).json(books);
        }
    }

    findBook(bookTitle: string): void {
        if (bookTitle === '') 
            this._parameterEmpty('book-title');
        else {
            const books = this._bookService.findBook(bookTitle);

            if (books.length > 0)
                this._res.status(200).json(books);
            else
                this._objectNonExistent();
        }
    }

    borrowBook(isbn: string, userName: string): void {
        if (isbn === '')
            this._parameterEmpty('isbn');
        else if (userName === '')
            this._parameterEmpty('user-name');
        else {
            const bookOrError = this._bookService.borrowBook(isbn, userName);
            const type = typeof bookOrError as string;

            if (type === 'ErrorCode')
                this._objectNonExistent();
            else
                this._res
                    .status(200)
                    .json(bookOrError);
        }
    }

    returnBook(isbn: string, userName: string): void {

    }

    listStock(): void {
        const books = this._bookService.getAllBooks();

        this._res.status(200).json(books);
    }
}
