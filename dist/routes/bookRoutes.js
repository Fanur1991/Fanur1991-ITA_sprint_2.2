"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bookControllers_1 = require("../controllers/bookControllers");
const router = (0, express_1.Router)();
router.get('/', bookControllers_1.fetchAllBooks);
router.get('/books', bookControllers_1.fetchFiltredBooks);
exports.default = router;
//# sourceMappingURL=bookRoutes.js.map