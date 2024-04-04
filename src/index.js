import app from './app.js'
import './db.js'
import { PORT } from "./config.js";
import connectToDatabase from './db.js'

connectToDatabase();
app.listen(PORT)
console.log('Server on port' , PORT)