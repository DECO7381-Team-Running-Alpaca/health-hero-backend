require('dotenv').config();
const express = require('express');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const cors = require('cors');

const userRouter = require('./routes/user');
const customisedRouter = require('./routes/customised');
const mealRouter = require('./routes/meal');
const errorHandler = require('./middlewares/errorHandler');
const { connectToDB } = require('./utils/mongoose');

const validator = require('./middlewares/validator');
const response = require('./utils/resFormatter');

const app = express();
app.use(cors);
const port = process.env.PORT || 3030;

// Init Swagger API document
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Health Hero API',
      version: '1.0.0',
      description: 'DECO7381 Group Project by Team Running Alpaca',
    },
    servers: [
      {
        url: 'https://health-hero-team-ra.herokuapp.com/',
      },
    ],
  },
  apis: ['src/routes/*.js'],
};
const specs = swaggerJsDoc(options);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));

app.get('/', (req, res) => res.send('<h1>Welcome to Health Hero</h1>'));

// TODO: delete the previous accounts and signup with new ones
app.post('/testOnMixed', validator, async (req, res) => {
  const tester = req.user;
  // Assume this is the request body.
  tester.current_plan = {
    monBreakfast: {
      title: 'abc',
      ingredients: ['a', 'b', 'c'],
      instructions: 'abcdefg',
    },
    monLunch: {
      title: 'abc',
      ingredients: ['a', 'b', 'c'],
      instructions: 'abcdefg',
    },
  };

  // Update must follow the below part.
  tester.markModified('current_plan');
  tester.save();
  return response(res, 200, 'Update User plan successfully', tester);
});

app.get('/testOnMixed', validator, async (req, res) => {
  return response(
    res,
    200,
    'Get Meal plan successfully',
    req.user.current_plan
  );
});

app.use(express.json());

app.use(errorHandler);

app.use(userRouter);
app.use(customisedRouter);
app.use(mealRouter);

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
