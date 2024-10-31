import { join } from 'path';
import gateway from 'express-gateway';
import { config } from "dotenv";
config()


gateway()
  .load(join(__dirname, 'config'))
  .run();
