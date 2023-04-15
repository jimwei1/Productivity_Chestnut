const express = require('express');
const app = express();

app.use(express.static('src'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/src/stuff.html');
  });
app.listen(3000, () => {
  console.log('Server started on port 3000');
});