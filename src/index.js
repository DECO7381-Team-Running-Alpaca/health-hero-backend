const express = require('express');
const routes = require('./routes/team');

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.use('/teams', routes);

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>');
});

app.listen(port, () => console.log(`Listening on ${port}`));
