import * as fs from 'fs';
// import { promisify } from 'util';
import { Book } from '../types/Book';

// const readFileAsync = promisify(fs.readFile);

const PATH_DATABASE = './src/data/books.json' || '';

export const getAllBooks = async (): Promise<Book[]> => {
  try {
    // Aquí es donde se simula el retraso de acceso a la base de datos
    await new Promise((resolve) => setTimeout(resolve, 200));

    if (!PATH_DATABASE) {
      throw new Error('Database path is not defined');
    }

    // Leemos los datos de JSON
    const data = await fs.promises.readFile(PATH_DATABASE, 'utf-8');
    const books: Book[] = JSON.parse(data);
    return books;
  } catch (error) {
    console.log('Error in service' + error);
    throw new Error('Error fetching books from database');
  }
};

export const filterBooks = async (searchQuery: string): Promise<Book[]> => {
  try {
    // Aquí es donde se simula el retraso de acceso a la base de datos
    await new Promise((resolve) => setTimeout(resolve, 200));

    // Leemos los datos de JSON
    const data = await fs.promises.readFile(PATH_DATABASE, 'utf-8');
    const books: Book[] = JSON.parse(data);

    // Filtrar libros por autor basado en search Query
    const filtredBooks: Book[] = books.filter((book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase().trim())
    );

    return filtredBooks;
  } catch (error) {
    console.log('Error in service' + error);
    throw new Error('Error fetching books from database');
  }
};
