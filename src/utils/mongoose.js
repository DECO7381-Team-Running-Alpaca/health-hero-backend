const mongoose = require('mongoose');

// mongoose.connect('mongodb://127.0.0.1:27017/health-hero', {
//   useNewUrlParser: true,
//   useCreateIndex: true,
//   useUnifiedTopology: true,
//   useFindAndModify: false,
// });

// mongoose.connect(process.env.DB_URL, {
//   useNewUrlParser: true,
//   useCreateIndex: true,
//   useUnifiedTopology: true,
//   useFindAndModify: false,
// });

// Do not turn on UQ VPN when connecting with mongo atlas
exports.connectToDB = () => {
  const DBurl = process.env.DB_URL;
  console.log(`Connecting to ${DBurl}`);

  return mongoose.connect(DBurl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
};
