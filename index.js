const express = require('express');
const app = express();
const path = require("path");
const {PORT = 8000} = process.env;

const router = require('./router');

// set body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "images")));

app.use(router);
app.listen(PORT, () => console.log(`Listening on port http://localhost:${PORT}`))