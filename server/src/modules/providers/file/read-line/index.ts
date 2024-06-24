import readline from 'readline';
import fs from 'fs';

import { IFileProvider } from '../interfaces/file.interface';

export class ReadLineProvider implements IFileProvider {
  private createLineReader(filePath: string): readline.Interface {
    const stream = fs.createReadStream(filePath, { encoding: 'utf-8'});
    const rl = readline.createInterface({
      input: stream,
      crlfDelay: Infinity
    });

    return rl;
  }

  async *processFile (filePath: string): AsyncGenerator<string, void, undefined> {
    const rl = this.createLineReader(filePath);

    for await (const line of rl) {
      yield line;
    }

    rl.close();
  }
}