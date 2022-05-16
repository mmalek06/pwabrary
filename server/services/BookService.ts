import Book from '../models/Book';
import { ErrorCodes } from './ErrorCodes';
import IBookService from './IBookService';

export class BookService implements IBookService {
    private _borrowedBooks: Map<string, string[]>;

    constructor(
        private _bookSearchSensitivity: number,
        private _authorSearchSensitivity: number,
        private _books: Book[]) {
        this._borrowedBooks = new Map();
    }

    getAllBooks(): Book[] {
        return this._books;
    }

    findBook(maybeTitle: string): Book[] {
        const candidates: Book[] = []

        for (const book of this._books) {
            const distance = this._levDist(book.title.toLowerCase(), maybeTitle.toLowerCase());

            if (distance > this._bookSearchSensitivity)
                continue;

            candidates.push(book);
        }

        return candidates;
    }

    findAuthorsBooks(maybeAuthorName: string): Book[] {
        const foundBooks: Book[] = [];

        for (const book of this._books) {
            for (const author of book.authors) {
                const distance = this._levDist(author.name.toLowerCase(), maybeAuthorName.toLowerCase());

                if (distance > this._authorSearchSensitivity)
                    continue;

                foundBooks.push(book);

                break;
            }
        }

        return foundBooks;
    }

    borrowBook(isbn: string, userName: string): Book | ErrorCodes {
        const book = this._books.find(b => b.isbn == isbn);

        if (book === undefined)
            return ErrorCodes.BOOK_NOT_FOUND;
        if (this._borrowedBooks.has(isbn) && this._borrowedBooks.get(isbn)!.length >= book.stock)
            return ErrorCodes.BOOK_BORROWED;
        if (!this._borrowedBooks.has(isbn))
            this._borrowedBooks.set(isbn, []);
            
        this._borrowedBooks.get(isbn)!.push(userName);

        return book
    }

    returnBook(isbn: string, userName: string): void | ErrorCodes {
        const book = this._books.find(b => b.isbn == isbn);

        if (!this._borrowedBooks.has(isbn))
            return ErrorCodes.BOOK_NOT_BORROWED;

        const userIdx = this._borrowedBooks.get(isbn)!.findIndex(x => x == userName);

        if (userIdx < 0)
            return ErrorCodes.BOOK_NOT_BORROWED_BY_USER;

        this._borrowedBooks.get(isbn)!.splice(userIdx, 1);
    }

    private _levDist(a: string, b: string): number {
        const c = a.length + 1;
        const d = b.length + 1;
        const r = Array(c);

        for (let i = 0; i < c; ++i) 
            r[i] = Array(d);
      
        for (let i = 0; i < c; ++i) 
            r[i][0] = i;
      
        for (let j = 0; j < d; ++j) 
            r[0][j] = j;

        for (let i = 1; i < c; ++i) {
            for (let j = 1; j < d; ++j) {
                const s = (a[i - 1] === b[j - 1] ? 0 : 1);
                
                r[i][j] = Math.min(r[i - 1][j] + 1, r[i][j - 1] + 1, r[i - 1][j - 1] + s);
            }
        }
        
        return r[a.length][b.length];
    }
}
