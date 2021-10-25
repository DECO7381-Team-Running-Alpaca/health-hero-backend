const mongoose = require('mongoose');

// Do not turn on UQ VPN (global connect) when connecting with mongo atlas
exports.connectToDB = () => {
  const DBurl = process.env.DB_URL;
  console.log(`Connecting to ${DBurl}`);

  return mongoose.connect(DBurl, {
    autoIndex: false,
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
};
