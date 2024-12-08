import dotenv from 'dotenv';
import mongoose from "mongoose";

dotenv.config();

export async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URI!)
        
        const connection = mongoose.connection;

        connection.on('connected',()=>{
            console.log('MongoDB connected');
        });
        connection.on('error',(err:any)=>{
            console.log('MongoDB connection error!: ' + err);
            process.exit();
        });

        if (!process.env.MONGO_URI) {
            console.log('MONGO_URI environment variable is not defined!');
        }
    } catch (error:any) {
        console.log('Connection Error!')
        console.log(error);
    }
}