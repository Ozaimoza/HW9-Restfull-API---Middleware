require('dotenv').config()
const express = require('express')
const port = process.env.APP_PORT 
const app = express()
const bodyParser = require('body-parser')
const swaggerJSdoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
const { swaggerDocument } = require('./swagger/swagger.js');
const morgan = require ('morgan')


const options = {
    definition: swaggerDocument, 
    apis: ['usersRouter.js'], // Add the path to your router file
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(morgan('common'))

//Require the Router we defined in movies.js
var movies = require('./routes/movies.js');
var users = require('./routes/users.js');

app.use('/users', users),
app.use('/movies', movies)

const specs = swaggerJSdoc(options)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))

app.listen(port)





