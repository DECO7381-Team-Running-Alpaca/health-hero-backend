const express = require('express');
require('./utils/mongoose');

const teamRouters = require('./routes/team');
const userRouter = require('./routes/user');

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use('/teams', teamRouters);
app.use(userRouter);

app.listen(port, () => console.log(`Listening on ${port}`));
