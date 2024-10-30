import { join } from 'path';
import gateway from 'express-gateway';

gateway()
  .load(join(__dirname, 'config'))
  .run();
