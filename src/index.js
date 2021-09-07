const express = require('express');
require('./utils/mongoose');

const userRouter = require('./routes/user');
const preferenceRouter = require('./routes/preference');
const allergyRouter = require('./routes/allergy');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use(userRouter);
app.use(preferenceRouter);
app.use(allergyRouter);

app.listen(port, () => console.log(`Listening on ${port}`));
