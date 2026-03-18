import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import { connectDb } from './config/db';
import companyRoutes from './routes/companyRoutes';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/companies', companyRoutes);

connectDb();

app.listen(3000, () => {
	console.log('Server running on http://localhost:3000');
});
