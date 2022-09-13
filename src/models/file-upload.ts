export class FileUpload {
  path: string;
  isNew: boolean;
  isImage: boolean;
  fileName!: string;
  extension!: string;
  file?: File | Blob;

  constructor(path: string, file?: File) {
    this.path = path;
    this.file = file;
    this.isNew = false;
    this.isImage = false;

    if (file) this.isNew = true;

    if (path.indexOf('http') >= 0) {
      path = path.replace(/%2F/gi, '/');
      path = path.split('/').slice(-1)[0];
      this.fileName = path.split('?')[0];
    } else if (file?.name) this.fileName = file.name;

    if (this.fileName) {
      const imageExts = ['png', 'jpg', 'jpeg', 'gif', 'svg'];
      this.extension = this.fileName.split('.').slice(-1)[0];
      this.isImage = imageExts.includes(this.extension);
    }
  }
}