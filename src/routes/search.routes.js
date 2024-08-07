import express from 'express';
import { searchProperties } from '../controllers/search.controller.js';

const router = express.Router();

router.get('/', searchProperties);

export default router;
