const dotenv = require('dotenv');
dotenv.config();
const MongoClient = require('mongodb').MongoClient;
let database;
const initDb = (callback) => {
  if (database) {
    console.log('Database is already initialized!');
    return callback(null, database);
  }

  MongoClient.connect(process.env.MONGODB_URL)
    .then((client) => {
      database = client;
      callback(null, database);
    })
    .catch((err) => {
      callback(err);
    });
}

const getDatabase = () => {
  if (!database) {
    throw new Error('Database not initialized');
  }
  return database;
};
module.exports = { initDb, getDatabase };

/*const client = new MongoClient(process.env.MONGODB_URL);

let db;

module.exports = {
  connect: () => {
    return client.connect()
      .then(() => {
        db = client.db();
      });
  },
  getDb: () => {
    if (!db) {
      throw new Error('Database not initialized');
    }
    return db;
  },
  initDb: (callback) => {
    client.connect()
      .then(() => {
        db = client.db();
        callback(null);
      })
      .catch(err => {
        callback(err);
      });
  }
};*/
