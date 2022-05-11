import { Book } from '../models/Book';
import { IBookRepository } from './IBookRepository';

export class BookRepository implements IBookRepository {
    constructor(
        private bookSearchSensitivity: number,
        private authorSearchSensitivity: number,
        private books: Array<Book>) {}

    getAllBooks(): Array<Book> {
        return this.books;
    }

    findBook(maybeTitle: string): Array<Book> {
        const candidates: Array<Book> = []

        for (const book of this.books) {
            const distance = this.levDist(book.title.toLowerCase(), maybeTitle.toLowerCase());

            if (distance > this.bookSearchSensitivity)
                continue;

            candidates.push(book);
        }

        return candidates;
    }

    findAuthorsBooks(maybeAuthorName: string): Array<Book> {
        const foundBooks: Array<Book> = [];

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
        const minDist = (s1: number, s2: number): number => {
            if (s1 == a.length || s2 == b.length)
                return a.length - s1 + b.length - s2;

            // no change required
            if (a[s1] == b[s2])
                return minDist(s1 + 1, s2 + 1);

            return 1 + Math.min(
                minDist(s1, s2 + 1), // insert character
                minDist(s1 + 1, s2), // delete character
                minDist(s1 + 1, s2 + 1), // replace character
            );
        };

        return minDist(0, 0);
    }
}
