const express = require('express');
require('./utils/mongoose');

const userRouter = require('./routes/user');
const preferenceRouter = require('./routes/preference');
const allergyRouter = require('./routes/allergy');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('<h1>Welcome to Health Hero</h1>');
});

app.use(userRouter);
app.use(preferenceRouter);
app.use(allergyRouter);

app.listen(port, () => console.log(`Listening on ${port}`));

module.exports = app;
