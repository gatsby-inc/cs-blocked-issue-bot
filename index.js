import post from './post.js';
import tickets from './tickets.js';
import dotenv from 'dotenv';
dotenv.config();

tickets().then(data => post(data));



