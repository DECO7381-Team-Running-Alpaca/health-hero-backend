require('dotenv').config();
const express = require('express');
// const swaggerUI = require('swagger-ui-express');
// const swaggerJsDoc = require('swagger-jsdoc');
const { connectToDB } = require('./utils/mongoose');

const userRouter = require('./routes/user');
const errorHandler = require('./middlewares/errorHandler');

// const options = {
//   definition: {
//     openapi: '3.0.0',
//     info: {
//       title: 'Health Hero API',
//       version: '1.0.0',
//       description: 'DECO7381 Group Project by Team Running Alpaca',
//     },
//     server: [
//       {
//         url: 'http://localhost:3000',
//       },
//     ],
//   },
//   apis: ['./routes/*.js'],
// };

// const specs = swaggerJsDoc(options);

const app = express();
const port = process.env.PORT || 3000;

// app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));

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

app.use(errorHandler);

connectToDB()
  .then(() => {
    console.log('DB connected!');
    app.listen(port, () => console.log(`Listening on ${port}`));
  })
  .catch((error) => {
    console.log('DB connection failed');
    console.log(error.message);
  });

module.exports = app;
