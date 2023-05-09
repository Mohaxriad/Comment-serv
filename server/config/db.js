const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.DB_URL);
        console.log(`MongoDB Connected`);
    } catch (err) {
        console.error(err);
        console.log('MongoDB connection failed');
        process.exit(1);
    }
}

module.exports = connectDB;