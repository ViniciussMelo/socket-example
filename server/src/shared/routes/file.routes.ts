import { Router } from 'express';

import { FileController } from '../../modules/files/controllers/file.controller';
import { fileUploaderInstance } from '../../modules/providers';

const fileController = new FileController();
const fileRoutes = Router();

fileRoutes.post(
  '/upload', 
  (req, res, next) => fileUploaderInstance.uploadFile(req, res, next),
  fileController.upload.bind(fileController)
);

export { fileRoutes }