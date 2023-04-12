import deskRoutes from './Desk.routes';
import officeRoutes from './Office.routes';
import organizationRoutes from './Organization.routes';
import sessionRoutes from './Auth.routes';
import userRoutes from './User.routes';

import express from "express";

const router = express.Router();

router.use(officeRoutes);
router.use(deskRoutes);
router.use(organizationRoutes);
router.use(sessionRoutes);
router.use(userRoutes);

export default router;