import deskRoutes from './Desk';
import officeRoutes from './Office';
import organizationRoutes from './Organization';
import sessionRoutes from './Auth';
import userRoutes from './User';
import reservationRoutes from './Reservation';

import express from "express";

const router = express.Router();

router.use(officeRoutes);
router.use(deskRoutes);
router.use(organizationRoutes);
router.use(sessionRoutes);
router.use(userRoutes);
router.use(reservationRoutes);

export default router;