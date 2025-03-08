const express = require('express');
const app = express();
const port = 3008;

app.use('/images', express.static(__dirname + '/images'));

app.listen(port, () => {
  console.log(`Server running at http://${port}/`);
});