import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();
const { DATABASE_URL } = process.env

mongoose.connect = mongoose.connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })

mongoose.connection
    .on("open", () => console.log('Connected to MongoDB'))
    .on("error", (error) => console.log(error))

export default mongoose;