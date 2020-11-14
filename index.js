import post from './post.js';
import tickets from './tickets.js';
import dotenv from 'dotenv';
dotenv.config();

export default (req, res) => {
  tickets()
    .then(data => post(data, res))
    .then(res.send("Sent"));
}



