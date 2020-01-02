import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class FileProcessingService {

  constructor() { }
  // takes an array of JavaScript File objects
  /*getFileDetails(files: File[]): Promise<FileDetailsResponse[]> {
    return Promise.all(files.map(file => this.getFile(file)));
  }*/
  getFileDetails(files: FileList): Promise<FileDetails[]> {
    return Promise.all(Object.keys(files).map(key => this.getFile(files[key])));
  }

  // take a single JavaScript File object
  private getFile(file: File): Promise<FileDetails> {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.onerror = () => { fileReader.abort(); reject(new Error("Error parsing file")); };
      fileReader.onloadend = () => {
        const image: any = new Image();
        const base64StringFile = fileReader.result;
        const response = Object.assign({}, {
          file,
          url: base64StringFile,
          base64StringFile,
          fileName: file.name,
          fileType: file.type,
          height: image.height,
          width: image.width
        });
        image.onload = () => {
          response.height = image.height;
          response.width = image.width;
          resolve(response);
        };
        image.src = base64StringFile;
      };
      fileReader.readAsDataURL(file);
    });
  }
}

export interface FileDetails {
  file: File;
  type?: string;
  id?: number;
  isDeleted?: boolean;
  url: string | ArrayBuffer;
  base64StringFile: string | ArrayBuffer;
  fileName: string;
  fileType: string;
  height: number;
  width: number;
}

export interface AssetIcons {
  AssetID: number;
  AssetURL: string;
  AssetTypeID: number;
  AssetType: string;
}

export interface FileDimension {
  type?: string;
  minWidth?: number;
  width?: number;
  maxWidth?: number;
  minHeight?: number;
  height?: number;
  maxHeight?: number;
}