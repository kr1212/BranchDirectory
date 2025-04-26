const express = require('express')
const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
const branchRoutes = require('./routes/branchRoutes')

const app = express()
const PORT = 3000;

const swaggerOptions = {
    swaggerDefinition:{
        openapi: '3.0.0',
        info:{
            title: 'Branch Directory API',
            version: '1.0.0',
            description: 'API for managing branch information with pagination, search, and sorting'
        }
    },
    apis: ['./routes/*.js'],
}

const swaggerDocs = swaggerJSDoc(swaggerOptions)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

app.use('/api/branches', branchRoutes)

app.listen(PORT, ()=> {
    console.log(`Server started on port ${PORT}`)
})