const express = require('express');
const mongodb = require('./data/database');

const app = express();
const port = process.env.PORT || 3000;

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
