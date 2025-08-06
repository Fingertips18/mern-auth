import express from 'express';

import { INDEX_TEMPLATE } from '../templates/index.template.js';
import { Routes } from '../constants/routes.constant.js';

const router = express.Router();

router.get(Routes.root.path, (_, res) => {
  res.send(INDEX_TEMPLATE);
});

export default router;
