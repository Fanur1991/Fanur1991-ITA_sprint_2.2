"use strict";
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
exports.fetchFiltredBooks = exports.fetchAllBooks = void 0;
const bookService_1 = require("../services/bookService");
const fetchAllBooks = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const books = yield (0, bookService_1.getAllBooks)();
        if (books.length > 0)
            res.json({ books: books });
        else
            res.status(404).json({ message: 'Books not found' });
    }
    catch (error) {
        console.log('Error in controller' + error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.fetchAllBooks = fetchAllBooks;
const fetchFiltredBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const searchQuery = req.query.search;
        const filteredBooks = yield (0, bookService_1.filterBooks)(searchQuery);
        if (filteredBooks.length > 0)
            res.json({ books: filteredBooks });
        else
            res.status(404).json({ message: 'Books not found' });
    }
    catch (error) {
        console.log('Error in controller' + error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.fetchFiltredBooks = fetchFiltredBooks;
//# sourceMappingURL=bookControllers.js.map