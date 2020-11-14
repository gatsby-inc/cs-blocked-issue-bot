const post = require('./post.js');
const tickets = require('./tickets.js');

module.exports = (req, res) => {
  tickets()
    .then(data => post(data, res))
    .then(res.send("Sent"));
}



