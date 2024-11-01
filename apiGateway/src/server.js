const { join } = require('path');
const gateway = require('express-gateway');
require("dotenv").config()


gateway()
  .load(join(__dirname, 'config'))
  .run();
