import { Book } from "../models/Book";

export interface IBookRepository {
    getAllBooks(): Book[];
    findBook(maybeTitle: string): Book[];
    findAuthorsBooks(maybeAuthorName: string): Book[];
}
