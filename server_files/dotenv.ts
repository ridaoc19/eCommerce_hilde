import 'dotenv/config';
import * as dotenv from 'dotenv'
// dotenv.config({ path: `.env.${process.env.NODE_ENV}` })
dotenv.config({ path: process.env.NODE_ENV === 'development' ? '.env.development' : '.env.production' })
