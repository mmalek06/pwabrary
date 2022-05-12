import { parse } from 'csv-parse';
import fs from 'fs';

import { Author } from '../models/Author';
import { Book } from '../models/Book';

export const readLibrary = (filePath: string, onReadFinished: (books: Array<Book>) => void): void => {
    const result: Array<Book> = [];

    fs.createReadStream(filePath)
        .pipe(parse({delimiter: '\t'}))
        .on('data', row => result.push({
            isbn: row[0],
            title: row[1],
            authors: row[2].split(';').map(getAuthor),
            stock: parseInt(row[3])
        }))
        .on('end', () => onReadFinished(result));
};

const getAuthor = (authorData: string): Author => {
    const parts = authorData.split(/ (.*)/s);

    return { identifier: parts[0], name: parts[1] };
}
