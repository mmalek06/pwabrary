import { Request, Response } from 'express';
import { Get, Post, Route } from 'tsoa';
import { ErrorCodes } from '../services/ErrorCodes';

import IBookService from '../services/IBookService';
import BaseController from './BaseController';

@Route('api/library')
export class LibraryController extends BaseController {
    constructor(
        private _bookService: IBookService,
        req: Request,
        res: Response) {
        super(res, req);
    }

    @Get('author-books?author-name={authorName}')
    listAuthorBooks(authorName: string): void {
        if (authorName === '')
            this._parameterEmpty('author-name');
        else {
            const books = this._bookService.findAuthorsBooks(authorName);

            this._res.status(200).json(books);
        }
    }

    @Get('find-book?book-title={bookTitle}')
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

    @Post('borrow-book?isbn={isbn}&user-name={userName}')
    borrowBook(isbn: string, userName: string): void {
        if (isbn === '')
            this._parameterEmpty('isbn');
        else if (userName === '')
            this._parameterEmpty('user-name');
        else {
            const bookOrError = this._bookService.borrowBook(isbn, userName);
            const type = typeof bookOrError as string;

            if (type === 'number')
                this._serviceError(bookOrError as ErrorCodes);
            else
                this._res
                    .status(200)
                    .json(bookOrError);
        }
    }

    @Post('return-book?isbn={isbn}&user-name={userName}')
    returnBook(isbn: string, userName: string): void {
        if (isbn === '')
            this._parameterEmpty('isbn');
        else if (userName === '')
            this._parameterEmpty('user-name');
        else {
            const voidOrError = this._bookService.returnBook(isbn, userName);
            const type = typeof voidOrError as string;

            if (type !== 'number')
                this._res.status(200).json({});
            else
                this._res
                    .status(400)
                    .json({
                        error: voidOrError
                    });
        }
    }

    @Get('list-stock')
    listStock(): void {
        const books = this._bookService.getAllBooks();

        this._res.status(200).json(books);
    }
}
