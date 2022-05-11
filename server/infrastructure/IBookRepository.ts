import { Book } from "../models/Book";

export interface IBookRepository {
    getAllBooks(): Array<Book>;
    findBook(maybeTitle: string): Array<Book>;
    findAuthorsBooks(maybeAuthorName: string): Array<Book>;
}
