const express = require("express");
const { getBranches } = require("../controllers/branchController");

const router = express.Router();

/**
 * @swagger
 * /api/branches:
 *   get:
 *     summary: Get a list of branches
 *     parameters:
 *       - in: query
 *         name: searchBy
 *         schema:
 *           type: string
 *         description: Field to search by
 *       - in: query
 *         name: searchValue
 *         schema:
 *           type: string
 *         description: Value to search
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: Field to sort by
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         description: Sort order
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: Successful response
 */

router.get("/", getBranches);

module.exports = router;
