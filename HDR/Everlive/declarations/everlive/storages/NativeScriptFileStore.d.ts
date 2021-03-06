import { FileStore } from './FileStore';
export declare class NativeScriptFileStore implements FileStore {
    storagePath: string;
    options: any;
    readonly filesDirectoryPath: string;
    private readonly fs;
    constructor(storagePath: string, options: any);
    getErrorHandler(callback: Function): (e: any) => void;
    removeFilesDirectory(): Promise<any>;
    removeFile(fileEntry: any): any;
    readFileAsText(fileEntry: any): any;
    writeTextToFile(fileEntry: any, content: any): any;
    getFile(path: any): Promise<any>;
    getFilesDirectory(): Promise<any>;
    getFilesDirectoryPath(): string;
    writeText(fileName: string, text: string, path?: string): void;
    createDirectory(): void;
    getFileSize(file: string, getFileSize: string): void;
    getFileByAbsolutePath(path: string): void;
    readFileAsBase64(file: any): void;
    renameFile(): void;
}
