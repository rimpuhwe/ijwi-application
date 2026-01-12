import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import publicRoutes from './routes/public';
import adminRoutes from './routes/admin';
import authRoutes from './routes/auth';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/public', publicRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/auth', authRoutes);

export default app;
