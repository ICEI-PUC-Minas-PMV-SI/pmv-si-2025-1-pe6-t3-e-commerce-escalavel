// routes/authRoutes.js
import express from 'express';
import { forgotPassword, resetPassword } from '../controllers/authController.js';

const router = express.Router();

router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

export default router;
