const post = require('./post.js');
const tickets = require('./tickets.js');

module.exports = (req, res) => {
  return tickets()
    .then(data => post(data))
    .then(res.send("Sent"));
}



