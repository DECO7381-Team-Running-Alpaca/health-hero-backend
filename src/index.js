const express = require('express');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
require('./utils/mongoose');

const userRouter = require('./routes/user');
const preferenceRouter = require('./routes/preference');
const allergyRouter = require('./routes/allergy');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Health Hero API',
      version: '1.0.0',
      description: 'DECO7381 Group Project by Team Running Alpaca',
    },
    server: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./routes/*.js'],
};

const specs = swaggerJsDoc(options);

const app = express();
const port = process.env.PORT || 3000;

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));

app.use(express.json());

/**
 * @swagger
 * /:
 *  get:
 *  summary: Return the welcome page
 *  responses:
 *    200:
 *      description:
 *      content:
 *        application/json:
 *          schema:
 *            type: string
 */
app.get('/', (req, res) => {
  res.send('<h1>Welcome to Health Hero</h1>');
});

app.use(userRouter);
app.use(preferenceRouter);
app.use(allergyRouter);

app.listen(port, () => console.log(`Listening on ${port}`));

module.exports = app;
