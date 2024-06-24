import { resolve } from 'path';
import crypto from 'crypto';

const tmpFolder = resolve(__dirname, "..", "..", "..", "tmp")
const fileHash = (): string => crypto.randomBytes(16).toString('hex');

export {
  tmpFolder,
  fileHash
}