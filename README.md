Branch Directory API
A RESTful API built with Node.js, Express.js, and SQLite to manage branch information of Indian cities with features like search, sort, pagination, and Swagger documentation.

Tech Stack
Node.js
Express.js
SQLite3
Swagger

How to Setup and Run the Project

Clone the repository
git clone https://github.com/kr1212/BranchDirectory.git
cd branchdirectoryapi

Install Dependencies
npm install

Generate Data
node generateAndInsertBranches.js
This command will generate 100 Indian branches inside:

data/branches.json

db/branches.db

Run the Server
node app.js

API will be live at:
http://localhost:3000/api/branches

Swagger API Documentation:
http://localhost:3000/api-docs

Note:
1. Search is case-insensitive.

2. Sorting defaults to ascending if sortOrder is not provided.

3. Pagination defaults to page 1, 10 results per page.

4. Swagger documentation is available for easy API testing.