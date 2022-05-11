import { Author } from './Author';

interface _Book {
    isbn: string;
    title: string;
    authors: Array<Author>;
    stock: BigInt;
}

type Book = Required<_Book>;

export { Book };
