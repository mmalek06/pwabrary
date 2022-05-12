import { Book } from '../models/Book';
import { IBookRepository } from './IBookRepository';

export class BookRepository implements IBookRepository {
    constructor(
        private bookSearchSensitivity: number,
        private authorSearchSensitivity: number,
        private books: Book[]) {}

    getAllBooks(): Book[] {
        return this.books;
    }

    findBook(maybeTitle: string): Book[] {
        const candidates: Book[] = []

        for (const book of this.books) {
            const distance = this.levDist(book.title.toLowerCase(), maybeTitle.toLowerCase());

            if (distance > this.bookSearchSensitivity)
                continue;

            candidates.push(book);
        }

        return candidates;
    }

    findAuthorsBooks(maybeAuthorName: string): Book[] {
        const foundBooks: Book[] = [];

        for (const book of this.books) {
            for (const author of book.authors) {
                const distance = this.levDist(author.name.toLowerCase(), maybeAuthorName.toLowerCase());

                if (distance > this.authorSearchSensitivity)
                    continue;

                foundBooks.push(book);

                break;
            }
        }

        return foundBooks;
    }

    private levDist(a: string, b: string): number {
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
