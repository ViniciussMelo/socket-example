import { Request, Response } from 'express'
import { FileService } from '../services/file.service';

export class FileController {
  private fileService: FileService;
  
  constructor() {
    this.fileService = new FileService();
  }

  async upload(req: Request, res: Response) {
    this.fileService.process(req);

    return res.send()
  }
}