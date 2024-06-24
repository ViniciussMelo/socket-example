export interface IFileProvider {
  processFile (filePath: string): AsyncGenerator<string, void, undefined>;
}