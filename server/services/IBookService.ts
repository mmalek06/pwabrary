import Book from '../models/Book';
import { ErrorCodes } from './ErrorCodes';

export default interface IBookService {
    getAllBooks(): Book[];
    findBook(maybeTitle: string): Book[];
    findAuthorsBooks(maybeAuthorName: string): Book[];
    borrowBook(isbn: string, userName: string): Book | ErrorCodes;
}
