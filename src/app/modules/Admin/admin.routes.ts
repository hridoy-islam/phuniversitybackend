import express from 'express';
import { AdminController } from './admin.controller';
import validateRequest from '../../middlewares/validateRequest';
import { updateAdminValidationShema } from './admin.validation';

const router = express.Router();

router.get('/', AdminController.getAllAdmin);
router.get('/:id', AdminController.getSingleAdmin);
router.patch(
  '/:id',
  validateRequest(updateAdminValidationShema),
  AdminController.updateAdmin,
);
router.delete('/:id', AdminController.deleteAdmin);

export const AdminRoutes = router;
