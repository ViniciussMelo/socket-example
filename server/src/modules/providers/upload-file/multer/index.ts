import multer from 'multer';

import { tmpFolder, fileHash } from '../../../../configs/file/index'
import { IFileUpload } from '../interfaces/file-upload.interface';

export class MulterFileUploadProvider implements IFileUpload {
  private upload: multer.Multer;

  constructor() {
    const storage = multer.diskStorage({
      destination: tmpFolder,
      filename: (request, file, callback) => {
        const fileName = `${fileHash()}-${file.originalname}`;
  
        return callback(null, fileName);
      }
    })

    this.upload = multer({ storage: storage });
  }

  uploadFile(req: any, res: any, next: any): any {
    return this.upload.single('file')(req, res, next)
  }
}