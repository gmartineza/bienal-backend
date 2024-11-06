const { join } = require('path');
const gateway = require('express-gateway');
const renderSlap= require('./RenderSlap')

renderSlap(10, 4) // intervals between 6 and 14 minutes

gateway()
  .load(join(__dirname, 'config'))
  .run();