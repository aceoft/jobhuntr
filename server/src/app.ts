import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import { connectDb } from './config/db';
import companyRoutes from './features/company/companyRoutes';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Log all requests for debugging
app.use((req, _res, next) => {
	console.log(req.method, req.originalUrl);
	next();
});

app.use('/api/companies', companyRoutes);

connectDb();

app.listen(3000, () => {
	console.log('Server running on http://localhost:3000');
});
