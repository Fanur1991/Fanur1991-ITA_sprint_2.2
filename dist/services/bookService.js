"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterBooks = exports.getAllBooks = void 0;
const fs = __importStar(require("fs"));
// const readFileAsync = promisify(fs.readFile);
const PATH_DATABASE = './src/data/books.json' || '';
const getAllBooks = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!PATH_DATABASE) {
            throw new Error('Database path is not defined');
        }
        // Leemos los datos de JSON
        const data = yield fs.promises.readFile(PATH_DATABASE, 'utf-8');
        const books = JSON.parse(data);
        return books;
    }
    catch (error) {
        console.log('Error in service' + error);
        throw new Error('Error fetching books from database');
    }
});
exports.getAllBooks = getAllBooks;
const filterBooks = (searchQuery) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Leemos los datos de JSON
        const data = yield fs.promises.readFile(PATH_DATABASE, 'utf-8');
        const books = JSON.parse(data);
        // Filtrar libros por autor basado en search Query
        const filtredBooks = books.filter((book) => book.title.toLowerCase().includes(searchQuery.toLowerCase().trim()));
        return filtredBooks;
    }
    catch (error) {
        console.log('Error in service' + error);
        throw new Error('Error fetching books from database');
    }
});
exports.filterBooks = filterBooks;
//# sourceMappingURL=bookService.js.map