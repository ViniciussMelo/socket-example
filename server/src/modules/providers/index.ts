import { IFileUpload } from './upload-file/interfaces/file-upload.interface';
import { MulterFileUploadProvider } from './upload-file/multer';
import { ReadLineProvider } from './file/read-line';

export const fileProviderInstance = new ReadLineProvider();
export const fileUploaderInstance: IFileUpload = new MulterFileUploadProvider()