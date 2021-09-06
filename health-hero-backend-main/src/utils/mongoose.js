const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/health-hero', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

// Tony Local数据库文件位置，放在这方便我每次链接数据库...
// D:/MongoDBDir/MongoDB/bin/mongod.exe --dbpath=D:\MongoDBDir\MongoDB-data
