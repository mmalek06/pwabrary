import { Author } from './Author';

interface _Book {
    isbn: string;
    title: string;
    authors: Author[];
    stock: number;
}

type Book = Required<_Book>;

export { Book };
