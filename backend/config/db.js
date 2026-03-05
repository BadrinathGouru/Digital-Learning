const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            // Options are generally no longer necessary in Mongoose 6+, but good to have
        });

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.warn(`MongoDB Connection Error (Mock URI?): ${error.message}. Continuing without DB...`);
    }
};

module.exports = connectDB;
