const express = require('express');
const mongodb = require('./data/database');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept');
  next();
});
//app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', require('./routes'));

  mongodb.initDb((err) => {
   if (err) {
    console.log(err);
   } else {
    app.listen(port, () => { console.log(`Database initialized successfully. Server is running at http://localhost:${port}`);});
   }
  });
  
  /*app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});*/


  /*mongodb.connect()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  })
  .catch(err => {
    console.error('Database connection error:', err);
  });*/
