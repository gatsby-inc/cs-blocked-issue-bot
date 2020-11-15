const express = require('express');
const cors = require('cors');
const post = require('./post.js');
const tickets = require('./tickets.js');

const app = express();
const router = express.Router();

router.get('/', (req, res) => {
  return tickets()
    .then(data => post(data))
    .then(res.send("Sent"));
});

app.use(router);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server started on ${port}`));