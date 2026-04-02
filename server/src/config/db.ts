import mongoose from 'mongoose';

export async function connectDb() {
	const uri = process.env.NODE_ENV === 'production' ? process.env.MONGO_URI_PROD : process.env.MONGO_URI_DEV;
	await mongoose.connect(uri);
	console.log('Mongo connected');
}
