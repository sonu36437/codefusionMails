const mongoose = require('mongoose');
require(
    'dotenv'
).config();
let db=null;

async function connectToDatabase() {
    try {
     db= await mongoose.connect(process.env.CONNECTION_URL);
 
     

     
        console.log("Connected to database");
        return db;
    } catch (error) {
        console.error("Failed to connect to database:", error);
       
        process.exit(1); 
    }
}
module.exports = { connectToDatabase };

