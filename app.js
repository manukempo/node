const express = require('express');
require('dotenv').config();
// Connect the DB
require('./db/mongoose');

const app = express();
const port = process.env.NODE_PORT;
const routerPhone = require('./routers/phone');

app.use(express.json());
// Routers
app.use(routerPhone);

app.listen(port, () =>
  console.log(
    `Example app listening at http://localhost:1337 form the host or http://localhost:${port} from vagrant`
  )
);
