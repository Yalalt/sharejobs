import mongoose from "mongoose";

export function connectDB() {
    try {
        mongoose.connect(process.env.MONGO_URL!);

        const connection = mongoose.connection;
        connection.on('connected', () => {
            console.log('Mongo Database connected');
        });

        connection.on('error', (error) => {
            console.log("Mongo Database connection error, ", error);
        });
    } catch (error) {
        console.log(error);
    }
}